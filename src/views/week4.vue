<template>
<SiteHeader page="week4" />
<main class="page-layout">
  <CourseSidebar page="week4" />
  <article class="content">
    <section id="scope">
      <section>
      <h1>Coding Resources</h1>
      <p><a href="https://colab.research.google.com/drive/1MmkkaaeiQMFaGIxVVaINk2bLlG-65vCU" target="_blank">Week4_TransferLearning_UNet.ipynb</a></p>
      <p><a href="https://colab.research.google.com/drive/1AJabQr7jNACBQ5dQF4POnD2biUkg9kOK" target="_blank">Transfer_Learning_TA_Session.ipynb</a></p>
      <p><a href="https://colab.research.google.com/drive/18Uu9BMJNTNQVZt30iOR4INrrn8sek2jH" target="_blank">transfer_learning_dlgenai.ipynb</a></p>
    </section>
      <span class="label">SOURCE-ALIGNED OVERVIEW</span>
      <h2>1. What Week 4 covers</h2>
      <p>The supplied Week 4 live-coding notebook and slide deck name the session <b>“Transfer Learning &amp; Image Segmentation.”</b> The live-coding plan has two main parts:</p>
      <ol>
        <li><b>Transfer learning:</b> adapt a pretrained EfficientNet-B0 model to classify food images into pizza, steak and sushi.</li>
        <li><b>Image segmentation with U-Net:</b> use the Oxford-IIIT Pet dataset and predict a foreground/background mask for each pixel.</li>
      </ol>
      <p>The accompanying TA notebook adds the evolution of CNN architectures, especially AlexNet, VGGNet and ResNet, and compares feature extraction with fine-tuning. The notes below preserve that overall sequence and explain the mathematical and implementation details.</p>
      <div class="note"><b>Prerequisites:</b> understand Week 3's convolution, ReLU, pooling, feature maps and CNN training loop. Week 4 reuses those building blocks. The new ideas are pretrained weights, freezing/unfreezing layers, pixel-level labels, decoder upsampling and skip connections.</div>
      <h3>Learning objectives</h3>
      <ul>
        <li>Explain why a pretrained CNN can be useful when the target dataset is small.</li>
        <li>Distinguish feature extraction from fine-tuning.</li>
        <li>Load a pretrained torchvision model and replace its classification head.</li>
        <li>Use the model's recommended preprocessing transforms.</li>
        <li>Explain the difference between image classification and image segmentation.</li>
        <li>Describe U-Net's encoder, decoder and skip connections.</li>
        <li>Understand per-pixel binary loss and the Dice overlap score.</li>
      </ul>
    </section>

    <section id="recap">
      <h2>2. Why move beyond a CNN trained from scratch?</h2>
      <p>In Week 3, a CNN learned filters from the target dataset. At the beginning of training, those filters are random. The model must learn useful edges, textures, parts and object-level patterns using only the examples available in the target task.</p>
      <p>Training from scratch is useful when you have enough labelled data and compute, or when the target domain is very different from common image datasets. However, it can be inefficient when the dataset is small:</p>
      <ul>
        <li><b>Data demand:</b> many parameters need enough examples to learn robust patterns.</li>
        <li><b>Compute demand:</b> all layers must repeatedly update during backpropagation.</li>
        <li><b>Overfitting:</b> a high-capacity model may memorise a small training set instead of generalising.</li>
        <li><b>Optimisation difficulty:</b> very deep networks can be harder to train effectively.</li>
      </ul>
      <h3>The central idea</h3>
      <p>Instead of starting with random weights, begin with a network trained on a large image dataset. Its early layers often respond to broadly useful visual patterns such as edges, corners, colour contrasts and textures. Later layers combine these into more task-specific patterns. We keep useful learned representations and adapt the final part to our task.</p>
      <div class="eq">Target model = reusable pretrained feature extractor + task-specific prediction head</div>
      <p><b>Important qualification:</b> transfer learning is not guaranteed to improve every task. It tends to help when the source and target tasks share useful structure. A model trained on natural photographs may transfer less directly to unusual scientific imagery, medical scans or satellite data, so preprocessing and fine-tuning choices matter.</p>
    </section>

    <section id="architectures">
      <h2>3. A short history of CNN architectures</h2>
      <p>The Week 4 TA session uses three well-known architectures to motivate transfer learning.</p>
      <table>
        <thead><tr><th>Architecture</th><th>Key idea highlighted in the course material</th><th>Why it matters</th></tr></thead>
        <tbody>
          <tr><td><b>AlexNet (2012)</b></td><td>ReLU activations, dropout and GPU training in a successful deep CNN.</td><td>Demonstrated the impact of deep CNNs on large-scale image recognition.</td></tr>
          <tr><td><b>VGGNet (2014)</b></td><td>Stacks small \(3\times3\) convolutions; VGG-16 and VGG-19 are common variants.</td><td>A simple, uniform design can be made deep, but the classic VGG models are computationally and parameter heavy.</td></tr>
          <tr><td><b>ResNet (2015)</b></td><td>Residual/skip connections allow a block to learn a residual correction.</td><td>Residual connections help optimisation in very deep networks and enabled widely used 50-, 101- and 152-layer variants.</td></tr>
        </tbody>
      </table>
      <h3>Residual connections in one equation</h3>
      <p>Rather than asking a block to learn a complete mapping \(H(x)\), a residual block learns \(F(x)=H(x)-x\), then returns:</p>
      <div class="eq">\(y = F(x) + x\)</div>
      <p>The input \(x\) has a direct path to the output. This shortcut can make gradient flow easier. The dimensions of \(F(x)\) and \(x\) must match for direct addition; implementations may use a projection when they do not.</p>
      <p>These architectures are relevant because pretrained versions are available in computer-vision libraries. Week 4's main live example uses <b>EfficientNet-B0</b>; the TA materials also discuss adapting a ResNet classifier.</p>
    </section>

    <section id="transfer">
      <h2>4. Transfer learning: reuse and adapt</h2>
      <p><b>Transfer learning</b> means using knowledge learned on one task to help a different but related task. For image classification, a source model is often trained on ImageNet, a large dataset with many image categories. We adapt it to a smaller target dataset with a different set of labels.</p>
      <h3>What does a pretrained CNN contain?</h3>
      <ul>
        <li><b>Parameters/weights:</b> learned numerical values in convolutional and linear layers.</li>
        <li><b>Feature extractor/backbone:</b> the part that transforms pixels into a representation of visual patterns.</li>
        <li><b>Classifier head:</b> the final layers that map that representation to the source dataset's class scores.</li>
        <li><b>Pretrained weights:</b> parameter values learned during the source training process.</li>
      </ul>
      <p>Suppose the original model predicts 1,000 ImageNet classes, but our food task has only 3 classes. The feature extractor can still produce useful image representations, but the final output layer has the wrong number of outputs. We replace the head with a layer that outputs three scores.</p>
      <h3>Mathematical view</h3>
      <p>Let the pretrained feature extractor be \(f_\theta(x)\), where \(x\) is an image and \(\theta\) are pretrained parameters. A new classifier \(g_\phi\) maps features to class logits:</p>
      <div class="eq">\(z = g_\phi(f_\theta(x))\)</div>
      <p>In simple feature extraction, \(\theta\) is fixed and only \(\phi\) is learned. In fine-tuning, some or all of \(\theta\) is also updated using target-task examples.</p>
      <h3>Why freezing saves work</h3>
      <p>During backpropagation, gradients are needed only for trainable parameters. If backbone parameters have `requires_grad=False`, PyTorch does not calculate parameter gradients for those weights, and the optimiser does not update them. The forward pass through the backbone is still required to compute features.</p>
      <div class="note"><b>Do not confuse freezing with evaluation mode.</b> `requires_grad = False` controls whether parameters receive gradients. `model.eval()` changes the behaviour of modules such as Dropout and BatchNorm. They solve different problems and are often used together during feature-extraction training.</div>
    </section>

    <section id="strategies">
      <h2>5. Feature extraction versus fine-tuning</h2>
      <table>
        <thead><tr><th>Choice</th><th>Feature extraction</th><th>Fine-tuning</th></tr></thead>
        <tbody>
          <tr><td>Backbone parameters</td><td>Frozen</td><td>Some layers or all layers trainable</td></tr>
          <tr><td>New head</td><td>Trainable</td><td>Trainable</td></tr>
          <tr><td>Compute and memory</td><td>Usually lower</td><td>Usually higher</td></tr>
          <tr><td>Target dataset</td><td>Often a good first try for small datasets and related domains</td><td>Useful when the target dataset can support adaptation or has a domain gap</td></tr>
          <tr><td>Main risk</td><td>Features may be insufficiently specific to the target task</td><td>Overfitting or damaging useful pretrained features with overly large updates</td></tr>
        </tbody>
      </table>
      <h3>Strategy A: feature extraction</h3>
      <ol>
        <li>Load the pretrained model and its recommended weights.</li>
        <li>Freeze the backbone parameters.</li>
        <li>Replace the classifier head with one that has the target number of classes.</li>
        <li>Train only the new head.</li>
        <li>Evaluate on validation/test data not used for training.</li>
      </ol>
      <h3>Strategy B: fine-tuning</h3>
      <ol>
        <li>Start with the same pretrained model and target-specific head.</li>
        <li>Freeze most layers initially, or train only the head for a short warm-up.</li>
        <li>Unfreeze selected later layers (for example, the final ResNet block `layer4` in the TA example).</li>
        <li>Optimise the newly unfrozen parameters with a suitably small learning rate.</li>
        <li>Compare validation performance with feature extraction and watch for overfitting.</li>
      </ol>
      <p>A common practical pattern is to use a larger learning rate for the newly initialised head and a smaller learning rate for pretrained layers. This preserves useful features while allowing controlled adaptation.</p>
    </section>

    <section id="efficientnet">
      <h2>6. Worked example: EfficientNet-B0 for FoodVision Mini</h2>
      <p>The supplied live-coding notebook uses FoodVision Mini, a small food-image classification task with three labels: <b>pizza, steak and sushi</b>. The model is EfficientNet-B0 with pretrained ImageNet weights.</p>
      <h3>6.1 Load weights and model</h3>
      <pre><code>import torch
from torch import nn
from torchvision import models

weights = models.EfficientNet_B0_Weights.DEFAULT
model = models.efficientnet_b0(weights=weights)

print(model.classifier)</code></pre>
      <p>`weights=weights` requests the pretrained parameter set. The classifier is the task-specific output head. Inspecting it before replacing it helps identify the expected input feature count.</p>
      <h3>6.2 Freeze the feature extractor</h3>
      <pre><code>for parameter in model.features.parameters():
    parameter.requires_grad = False</code></pre>
      <p>EfficientNet's `features` module contains the convolutional feature extractor. Freezing it means its weights will not be updated during the head-training phase. The classifier remains trainable unless explicitly frozen.</p>
      <h3>6.3 Replace the classifier for three classes</h3>
      <pre><code>num_classes = 3
in_features = model.classifier[1].in_features

model.classifier[1] = nn.Linear(
    in_features=in_features,
    out_features=num_classes
)

# Inspect which parameters are trainable
trainable = [name for name, p in model.named_parameters()
             if p.requires_grad]
print(trainable)</code></pre>
      <p>The pretrained EfficientNet-B0 classifier's final linear layer uses 1,280 input features in the supplied course example. Reading `in_features` from the actual layer is safer than hard-coding the number: it keeps the code adaptable to another model variant. The replacement layer produces three logits—one for each target class.</p>
      <div class="eq">For a batch of \(B\) images, the model output shape is \((B,3)\).</div>
      <p>These outputs are <b>logits</b>, not probabilities. For a single image, the three numbers are unnormalised class scores. `CrossEntropyLoss` expects those logits and integer class labels; do not apply softmax before the loss.</p>
      <h3>6.4 Select the device and prepare the optimiser</h3>
      <pre><code>device = "cuda" if torch.cuda.is_available() else "cpu"
model = model.to(device)

criterion = nn.CrossEntropyLoss()
optimizer = torch.optim.Adam(
    (p for p in model.parameters() if p.requires_grad),
    lr=1e-3
)</code></pre>
      <p>Filtering by `requires_grad` makes the intention explicit: update only trainable parameters. An alternative is to pass `model.classifier.parameters()` when only the classifier is being trained.</p>
      <h3>6.5 Training loop pattern</h3>
      <pre><code>for epoch in range(num_epochs):
    model.train()
    running_loss = 0.0

    for images, labels in train_loader:
        images = images.to(device)
        labels = labels.to(device)

        optimizer.zero_grad()
        logits = model(images)
        loss = criterion(logits, labels)
        loss.backward()
        optimizer.step()

        running_loss += loss.item() * images.size(0)

    epoch_loss = running_loss / len(train_loader.dataset)
    print(f"Epoch {epoch + 1}: loss={epoch_loss:.4f}")</code></pre>
      <p>The course live-coding plan demonstrates a short training run (five epochs) as a practical starting point. The best number of epochs is data-dependent; do not assume five epochs is universally optimal. Track validation metrics to decide whether the model is learning and whether overfitting begins.</p>
      <ol>
        <li>`zero_grad()` clears gradients left by the previous batch.</li>
        <li>The forward pass produces logits.</li>
        <li>The loss compares logits with the true class indices.</li>
        <li>`backward()` computes gradients for trainable parameters.</li>
        <li>`step()` updates the classifier weights.</li>
      </ol>
    </section>

    <section id="preprocessing">
      <h2>7. Image preprocessing and DataLoaders</h2>
      <p>A pretrained model expects inputs prepared in a way compatible with its original training. Image size, tensor layout, numeric range and normalisation can affect predictions. A mismatch can cause errors or poor accuracy even if the model code is correct.</p>
      <h3>Use the transforms attached to the weights</h3>
      <pre><code>weights = models.EfficientNet_B0_Weights.DEFAULT
preprocess = weights.transforms()</code></pre>
      <p>In torchvision, the weights enum exposes a recommended preprocessing pipeline. This is a robust first choice because it keeps resizing, cropping and normalisation aligned with the selected pretrained weights. If you add training augmentation, ensure that the final tensors still meet the model's expected input requirements.</p>
      <h3>Dataset and DataLoader responsibilities</h3>
      <ul>
        <li><b>Dataset:</b> defines how to obtain one sample, typically an image and its label.</li>
        <li><b>Transform:</b> converts and optionally augments the image.</li>
        <li><b>DataLoader:</b> batches samples, can shuffle training data and can load data using worker processes.</li>
        <li><b>Batch:</b> a group of images processed together; it uses memory more efficiently than processing each image individually.</li>
      </ul>
      <pre><code>from torch.utils.data import DataLoader

train_loader = DataLoader(
    train_dataset,
    batch_size=32,
    shuffle=True
)
valid_loader = DataLoader(
    valid_dataset,
    batch_size=32,
    shuffle=False
)</code></pre>
      <p>Training data is usually shuffled to reduce dependence on sample order. Validation and test data are usually not shuffled because deterministic order makes inspection easier. Shuffling does not itself prevent data leakage: the split must be made correctly before loading.</p>
      <h3>Evaluate without updating weights</h3>
      <pre><code>model.eval()
correct = 0
total = 0

with torch.inference_mode():
    for images, labels in valid_loader:
        images = images.to(device)
        labels = labels.to(device)

        logits = model(images)
        predictions = logits.argmax(dim=1)

        correct += (predictions == labels).sum().item()
        total += labels.size(0)

accuracy = correct / total
print(f"Validation accuracy: {accuracy:.3%}")</code></pre>
      <p>`model.eval()` sets evaluation behaviour for modules such as BatchNorm and Dropout. `torch.inference_mode()` disables autograd tracking for inference. These are complementary, not interchangeable. Accuracy is useful but should be considered alongside per-class errors when classes are imbalanced.</p>
    </section>

    <section id="training">
      <h2>8. Reading training curves and making predictions</h2>
      <p>Training loss measures fit to the training batches. Validation loss and validation accuracy estimate performance on examples that were not used to update the weights.</p>
      <table>
        <thead><tr><th>Pattern</th><th>Possible interpretation</th><th>What to inspect</th></tr></thead>
        <tbody>
          <tr><td>Training loss decreases and validation performance improves</td><td>The model is learning useful patterns.</td><td>Continue monitoring and save the best validation checkpoint.</td></tr>
          <tr><td>Training loss decreases but validation performance stalls or worsens</td><td>Possible overfitting or domain mismatch.</td><td>Data augmentation, weight decay, early stopping, fewer trainable layers, or more data.</td></tr>
          <tr><td>Both losses remain high</td><td>Possible optimisation, preprocessing, label mapping or model setup issue.</td><td>Check learning rate, label indices, input normalisation and output dimensions.</td></tr>
          <tr><td>Accuracy is high but some classes fail</td><td>Overall accuracy may hide class-specific errors.</td><td>Inspect confusion matrix and per-class precision/recall.</td></tr>
        </tbody>
      </table>
      <h3>Convert logits into a class prediction</h3>
      <pre><code>model.eval()
with torch.inference_mode():
    logits = model(images.to(device))
    predicted_ids = logits.argmax(dim=1)</code></pre>
      <p>`argmax(dim=1)` selects the highest-scoring class for each image in a batch. To show a human-readable label, map the predicted index through the exact class-to-index mapping used by the dataset. Do not assume alphabetical ordering unless you have checked the dataset's mapping.</p>
      <h3>Save the trained weights</h3>
      <pre><code>torch.save(model.state_dict(), "food_classifier.pth")</code></pre>
      <p>To reload, recreate the same architecture, apply the same freezing/head configuration if relevant, load the state dictionary, move the model to the chosen device, and call `eval()` for inference. A state dictionary contains parameter tensors; it does not by itself define the Python model architecture or the class-name mapping.</p>
    </section>

    <section id="segmentation">
      <h2>9. Image segmentation: predicting “what” and “where”</h2>
      <p>Image classification assigns one label to a whole image. <b>Image segmentation</b> assigns a label to every pixel, producing a spatial mask.</p>
      <table>
        <thead><tr><th>Task</th><th>Typical output</th><th>Example question</th></tr></thead>
        <tbody>
          <tr><td>Image classification</td><td>One class label or a vector of class logits per image</td><td>“Is this image a cat or a dog?”</td></tr>
          <tr><td>Object detection</td><td>Class labels plus bounding boxes</td><td>“Where are the cats, approximately?”</td></tr>
          <tr><td>Semantic segmentation</td><td>A class label for every pixel</td><td>“Which pixels belong to the pet?”</td></tr>
          <tr><td>Instance segmentation</td><td>A separate mask for each object instance</td><td>“Which pixels belong to each individual pet?”</td></tr>
        </tbody>
      </table>
      <p>The Week 4 notebook uses Oxford-IIIT Pet segmentation masks and converts the trimap labels into a binary foreground/background task: pet versus background. The model must preserve enough spatial information to predict boundaries, not merely identify the main object.</p>
      <h3>Why a basic classifier is not enough</h3>
      <p>A CNN encoder repeatedly applies convolution and downsampling. This creates useful high-level features but reduces spatial resolution. A final fully connected classifier then compresses those features into class scores. That is suitable for classifying the image, but it discards much of the pixel-level detail needed for a mask.</p>
      <p>Segmentation therefore needs a model that can both:</p>
      <ul><li>understand high-level context (“this region is likely a pet”), and</li><li>recover fine spatial detail (“the pet boundary is here”).</li></ul>
      <p>U-Net addresses this with an encoder-decoder structure and skip connections.</p>
    </section>

    <section id="unet">
      <h2>10. U-Net: encoder, decoder and skip connections</h2>
      <p>U-Net is a convolutional encoder-decoder architecture originally popularised for biomedical image segmentation. Its shape resembles the letter U: the encoder contracts the spatial dimensions, and the decoder expands them back toward the input resolution.</p>
      <h3>10.1 Encoder / contracting path</h3>
      <p>The encoder applies convolution blocks and downsampling. As height and width shrink, the number of channels often increases. The features become more semantically meaningful, but exact pixel positions become less explicit.</p>
      <p>Conceptually: <b>convolution → activation → convolution → activation → downsample</b>. The supplied notebook uses convolutional blocks and pooling in the same spirit as the Week 3 CNN foundations.</p>
      <h3>10.2 Decoder / expansive path</h3>
      <p>The decoder increases spatial resolution using upsampling. In the supplied live session, `nn.ConvTranspose2d` is highlighted as a learned upsampling operation. For a common configuration with kernel size 2 and stride 2, the height and width double:</p>
      <pre><code>upsample = nn.ConvTranspose2d(
    in_channels=128,
    out_channels=64,
    kernel_size=2,
    stride=2
)</code></pre>
      <p>The exact output shape depends on the input dimensions, padding, stride, dilation, output padding and kernel size. Do not assume every transposed convolution always doubles the dimensions; that is true for the common \(k=2,s=2\) pattern shown here.</p>
      <h3>10.3 Skip connections</h3>
      <p>At each suitable scale, U-Net joins an encoder feature map to a decoder feature map. The encoder branch carries fine-grained spatial details that might have been lost during downsampling. The decoder branch carries richer semantic context. Combining them helps the model localise object boundaries.</p>
      <div class="eq">Encoder feature map + decoder feature map → concatenated features → convolution block</div>
      <p>In common U-Net implementations, concatenation is along the channel dimension, not addition. The two tensors must have matching batch size, height and width. If their spatial dimensions differ, the implementation must crop or resize one of them before concatenating.</p>
      <h3>10.4 High-level flow</h3>
      <ol>
        <li>Input image enters the encoder.</li>
        <li>Convolutions extract features; pooling reduces resolution.</li>
        <li>Intermediate encoder features are saved for skip connections.</li>
        <li>The decoder upsamples its current representation.</li>
        <li>Corresponding encoder features are concatenated into the decoder.</li>
        <li>Further convolutions refine the mask prediction.</li>
        <li>The output layer produces a per-pixel score map.</li>
      </ol>
    </section>

    <section id="masks">
      <h2>11. Segmentation masks, loss functions and Dice score</h2>
      <h3>11.1 Image and mask shapes</h3>
      <p>A batch of RGB images commonly has shape \((B,3,H,W)\) in PyTorch. A binary mask commonly has shape \((B,1,H,W)\), where a target value indicates whether each pixel belongs to the foreground. The exact representation depends on the dataset transform and model implementation, so inspect real batches.</p>
      <pre><code>images, masks = next(iter(train_loader))
print("images:", images.shape)
print("masks:", masks.shape)
print("image dtype:", images.dtype)
print("mask dtype:", masks.dtype)</code></pre>
      <p>Images are typically floating-point tensors. For `BCEWithLogitsLoss`, binary targets should be floating-point values compatible with the logits shape, commonly 0.0 and 1.0. Dataset trimaps may use several integer labels; the course example converts these into the two target groups before calculating the loss.</p>
      <h3>11.2 Binary cross-entropy with logits</h3>
      <p>For each pixel, the network produces a logit \(z\). The sigmoid function converts it into a foreground probability:</p>
      <div class="eq">\(p = \sigma(z)=\frac{1}{1+e^{-z}}\)</div>
      <p>For binary target \(y\in\{0,1\}\), binary cross-entropy is:</p>
      <div class="eq">\(\ell(z,y)=-\left[y\log\sigma(z)+(1-y)\log(1-\sigma(z))\right]\)</div>
      <p>The pixel losses are aggregated over the image/batch. In PyTorch, use `nn.BCEWithLogitsLoss()` with raw logits. It combines sigmoid and binary cross-entropy in a numerically stable operation.</p>
      <div class="note"><b>Common mistake:</b> do not apply sigmoid to model outputs before passing them to `BCEWithLogitsLoss`. For display or thresholding predictions, sigmoid is appropriate after the model's forward pass; for the loss, pass raw logits.</div>
      <h3>11.3 Thresholding logits into a mask</h3>
      <pre><code>with torch.inference_mode():
    logits = model(images.to(device))
    probabilities = torch.sigmoid(logits)
    predicted_mask = probabilities >= 0.5</code></pre>
      <p>A threshold of 0.5 is a common starting point, not a universal optimum. It corresponds to predicting foreground where the estimated probability is at least one half. If false positives and false negatives have different costs, the threshold may need tuning on validation data.</p>
      <h3>11.4 Dice score: measuring overlap</h3>
      <p>The Dice score compares a predicted foreground mask \(P\) with the ground-truth mask \(G\):</p>
      <div class="eq">\(\mathrm{Dice}(P,G)=\frac{2|P\cap G|}{|P|+|G|}\)</div>
      <p>Here, \(|P\cap G|\) is the number of pixels marked foreground in both masks; \(|P|\) and \(|G|\) are the foreground pixel counts. A score of 1 indicates perfect overlap; a score near 0 indicates little overlap. Implementations often add a small smoothing constant to avoid division by zero when both masks are empty.</p>
      <p>Dice is especially informative when the foreground occupies a small fraction of the image. Pixel accuracy alone can look high if the model predicts background for nearly every pixel.</p>
    </section>

    <section id="unet-code">
      <h2>12. U-Net implementation pattern in PyTorch</h2>
      <p>The supplied notebook implements U-Net with helper convolution blocks, an encoder path, a decoder path and skip connections. The following compact example illustrates the core shape logic; it is a study pattern rather than a line-for-line copy of the complete course notebook.</p>
      <h3>12.1 A double-convolution block</h3>
      <pre><code>import torch
from torch import nn

def double_conv(in_channels, out_channels):
    return nn.Sequential(
        nn.Conv2d(in_channels, out_channels, kernel_size=3, padding=1),
        nn.ReLU(inplace=True),
        nn.Conv2d(out_channels, out_channels, kernel_size=3, padding=1),
        nn.ReLU(inplace=True)
    )</code></pre>
      <p>With a \(3\times3\) kernel and padding 1, each convolution preserves height and width when stride is 1 and dilation is 1. The number of channels changes from `in_channels` to `out_channels`.</p>
      <h3>12.2 Shape trace for a simplified U-Net</h3>
      <p>Suppose the input is a batch of \(B\) RGB images of size \(128\times128\). One encoder level might transform:</p>
      <table><thead><tr><th>Stage</th><th>Example shape</th><th>What changed?</th></tr></thead>
      <tbody>
      <tr><td>Input</td><td>\((B,3,128,128)\)</td><td>RGB channels, original resolution.</td></tr>
      <tr><td>Double convolution</td><td>\((B,32,128,128)\)</td><td>Channels increase; spatial size preserved by padding.</td></tr>
      <tr><td>2×2 max pool</td><td>\((B,32,64,64)\)</td><td>Height and width halve.</td></tr>
      <tr><td>Next double convolution</td><td>\((B,64,64,64)\)</td><td>More feature channels at lower resolution.</td></tr>
      <tr><td>Next pooling</td><td>\((B,64,32,32)\)</td><td>Further spatial compression.</td></tr>
      </tbody></table>
      <p>This table shows only two encoder levels to demonstrate shape changes; channel counts and depth depend on the specific U-Net implementation. In the decoder, upsampling restores spatial size and skip concatenation increases the channel count before a convolution block refines the features.</p>
      <h3>12.3 A conceptual training step</h3>
      <pre><code>model.train()
for images, masks in train_loader:
    images = images.to(device)
    masks = masks.to(device).float()

    optimizer.zero_grad()
    logits = model(images)
    loss = criterion(logits, masks)
    loss.backward()
    optimizer.step()</code></pre>
      <p>This pattern assumes `model(images)` and `masks` have compatible shapes and that `criterion` is `nn.BCEWithLogitsLoss()`. Depending on the data pipeline, masks may need a channel dimension, resizing, binary conversion or a dtype conversion before this step. Verify shapes before training.</p>
      <h3>12.4 Qualitative evaluation</h3>
      <p>Visualise three things side by side: the input image, ground-truth mask and predicted mask. This reveals boundary errors and systematic mistakes that a single scalar score hides. Check whether the model misses thin parts, merges nearby regions, or labels background as foreground.</p>
    </section>

    <section id="debugging">
      <h2>13. Common errors and how to debug them</h2>
      <table>
        <thead><tr><th>Symptom</th><th>Likely cause</th><th>Check or fix</th></tr></thead>
        <tbody>
          <tr><td>Classifier output has the wrong number of classes</td><td>Pretrained head was not replaced or wrong layer was changed.</td><td>Print the model classifier and check output shape `(batch_size, num_classes)`.</td></tr>
          <tr><td>No backbone parameters update</td><td>They were frozen with `requires_grad=False`.</td><td>Print trainable parameter names. Unfreeze only the intended layers for fine-tuning.</td></tr>
          <tr><td>Loss function reports a shape or dtype error</td><td>Class labels, logits or segmentation masks have incompatible shapes/dtypes.</td><td>Print `images.shape`, `labels.shape`, `logits.shape`, and each dtype.</td></tr>
          <tr><td>Pretrained model accuracy is unexpectedly poor</td><td>Input preprocessing differs from what the weights expect, or class mapping is wrong.</td><td>Use the selected weights' transforms and inspect the dataset class-to-index mapping.</td></tr>
          <tr><td>CUDA/device mismatch</td><td>Model and tensors are on different devices.</td><td>Move model, images, labels and masks to the same device.</td></tr>
          <tr><td>U-Net skip concatenation fails</td><td>Encoder and decoder feature maps have different height/width.</td><td>Print both shapes; resize/crop or adjust padding/input dimensions.</td></tr>
          <tr><td>Segmentation loss shape mismatch</td><td>Logits are `(B,1,H,W)` but masks are `(B,H,W)`, or vice versa.</td><td>Add/remove the channel dimension consistently; ensure target values are binary floats for BCE-with-logits.</td></tr>
          <tr><td>Segmentation accuracy looks high but masks look poor</td><td>Background dominates pixel counts.</td><td>Inspect Dice/IoU and visual predictions, not only pixel accuracy.</td></tr>
          <tr><td>Validation result changes during evaluation</td><td>Model remains in training mode or data transforms are random.</td><td>Call `model.eval()` and use deterministic validation preprocessing.</td></tr>
        </tbody>
      </table>
      <h3>Minimal shape-debugging habit</h3>
      <pre><code>images, targets = next(iter(train_loader))
print("images", images.shape, images.dtype)
print("targets", targets.shape, targets.dtype)

images = images.to(device)
model.eval()
with torch.inference_mode():
    outputs = model(images)
print("outputs", outputs.shape, outputs.dtype)</code></pre>
      <p>Run a single batch through the model before starting a long training run. This catches architecture and data-pipeline problems early.</p>
    </section>

    <section id="comparison">
      <h2>14. Classification versus segmentation: key differences</h2>
      <table>
        <thead><tr><th>Property</th><th>Transfer-learning classifier</th><th>U-Net segmenter</th></tr></thead>
        <tbody>
          <tr><td>Prediction unit</td><td>Whole image</td><td>Each pixel</td></tr>
          <tr><td>Typical output</td><td>\((B,C)\) logits</td><td>\((B,1,H,W)\) logits for binary segmentation</td></tr>
          <tr><td>Target</td><td>One class index per image</td><td>Mask aligned with the image</td></tr>
          <tr><td>Common loss in these examples</td><td>`CrossEntropyLoss`</td><td>`BCEWithLogitsLoss`</td></tr>
          <tr><td>Architecture focus</td><td>Pretrained feature extractor + replacement classifier</td><td>Encoder + decoder + skip connections</td></tr>
          <tr><td>Typical evaluation</td><td>Accuracy, confusion matrix, per-class metrics</td><td>Dice score/IoU and mask visualisation</td></tr>
        </tbody>
      </table>
      <p>These are the two distinct problems covered in Week 4: adapting pretrained features makes classification more data-efficient, while U-Net restores spatial detail to support dense pixel predictions.</p>
    </section>

    <section id="practice">
      <h2>15. Practice questions with answers</h2>
      <p>These are study questions written from the topics present in the supplied Week 4 materials; they are not claimed to be verbatim graded-assignment questions.</p>
      <details><summary>Q1. Why can transfer learning help with a small target dataset?</summary><div class="answer">The pretrained backbone has already learned useful visual features from a large source dataset. The target task can reuse those features and learn only a smaller task-specific head, reducing the amount of target data and compute needed.</div></details>
      <details><summary>Q2. What does `requires_grad = False` do?</summary><div class="answer">It prevents autograd from calculating parameter gradients for that parameter and prevents gradient-based optimisers from updating it. It does not remove the layer from the forward pass.</div></details>
      <details><summary>Q3. A dataset has 3 classes. What should the final linear layer output?</summary><div class="answer">Three logits per image, so the output shape for a batch is `(B, 3)`. The class index with the largest logit is the predicted class.</div></details>
      <details><summary>Q4. Why use the transforms associated with pretrained weights?</summary><div class="answer">They encode the input resizing/cropping and normalisation expected by the selected weights, reducing mismatch between pretraining and inference.</div></details>
      <details><summary>Q5. Compare feature extraction and fine-tuning.</summary><div class="answer">Feature extraction freezes the backbone and trains the new head. Fine-tuning unfreezes some or all backbone layers and updates them on the target data, typically with careful learning-rate control.</div></details>
      <details><summary>Q6. What is the purpose of U-Net skip connections?</summary><div class="answer">They pass high-resolution encoder features to the decoder so the decoder can combine spatial detail with deeper semantic context, improving localisation and boundaries.</div></details>
      <details><summary>Q7. Why is a classification head not enough for segmentation?</summary><div class="answer">A classifier returns a class decision for the whole image and usually compresses spatial information. Segmentation needs a spatially aligned output label for every pixel.</div></details>
      <details><summary>Q8. If the U-Net outputs logits of shape `(8, 1, 128, 128)`, what target shape is a natural match for binary BCE-with-logits?</summary><div class="answer">A floating-point binary mask of shape `(8, 1, 128, 128)`, with values 0 or 1. If the dataset stores masks as `(8, 128, 128)`, add the channel dimension consistently.</div></details>
      <details><summary>Q9. Why not apply sigmoid before `BCEWithLogitsLoss`?</summary><div class="answer">The loss function already combines sigmoid with binary cross-entropy in a numerically stable way. Passing probabilities instead of logits is incorrect for this loss.</div></details>
      <details><summary>Q10. What does a Dice score of 1 mean?</summary><div class="answer">The predicted foreground and ground-truth foreground masks overlap perfectly under the chosen mask/threshold definition.</div></details>
      <details><summary>Q11. In a residual block, what does `F(x) + x` mean?</summary><div class="answer">The block adds its learned residual mapping to the input shortcut. The tensors must have compatible dimensions for addition.</div></details>
      <details><summary>Q12. Name three checks to do before training a segmentation model.</summary><div class="answer">Check image and mask shapes, verify mask values and dtype, and run a forward pass to confirm the model output shape matches the target. Also verify that all tensors and the model are on the same device.</div></details>
    </section>

    <section id="revision">
      <h2>16. Revision sheet</h2>
      <h3>Transfer learning</h3>
      <ul>
        <li>Pretrained backbone = previously learned feature extractor.</li>
        <li>Replace the source classifier with a target-specific head.</li>
        <li>Feature extraction: freeze backbone, train head.</li>
        <li>Fine-tuning: unfreeze selected backbone layers and update them carefully.</li>
        <li>Use the preprocessing transforms associated with the selected pretrained weights.</li>
        <li>Use raw logits with `CrossEntropyLoss`; labels are class indices.</li>
      </ul>
      <h3>Segmentation and U-Net</h3>
      <ul>
        <li>Classification predicts one label per image; segmentation predicts a label per pixel.</li>
        <li>Encoder: downsample and learn increasingly semantic features.</li>
        <li>Decoder: upsample toward the input resolution.</li>
        <li>Skip connections concatenate encoder detail with decoder context.</li>
        <li>Binary segmentation commonly uses raw logits with `BCEWithLogitsLoss`.</li>
        <li>Dice score measures foreground overlap; inspect masks visually as well.</li>
      </ul>
      <h3>Equations to know</h3>
      <div class="eq">Residual mapping: \(y=F(x)+x\)</div>
      <div class="eq">Sigmoid: \(\sigma(z)=1/(1+e^{-z})\)</div>
      <div class="eq">Dice: \(\mathrm{Dice}=2|P\cap G|/(|P|+|G|)\)</div>
      <h3>Before you finish studying</h3>
      <ul>
        <li>Can you explain why pretrained features transfer?</li>
        <li>Can you freeze a backbone and replace the classifier head?</li>
        <li>Can you explain what changes when you fine-tune?</li>
        <li>Can you trace image, logits and target shapes?</li>
        <li>Can you explain why U-Net needs skip connections?</li>
        <li>Can you explain why pixel accuracy alone may mislead?</li>
      </ul>
    </section>

    <section id="sources">
      <h2>17. Supplied course resources used</h2>
      <p>These notes were expanded using the uploaded archives supplied with the request. The listed files were present in those archives and their notebook headings/text and slide text were inspected.</p>
      <ul>
        <li><b>Live lecture resources:</b> `Week4/Week4_TransferLearning_UNet.ipynb` — transfer learning with EfficientNet-B0 and FoodVision Mini, then U-Net on Oxford-IIIT Pet masks.</li>
        <li><b>Live lecture slides:</b> `Week4/Week4_TransferLearning_Slides.pdf` — motivation for transfer learning, segmentation and U-Net.</li>
        <li><b>TA session:</b> `Week4/Transfer_Learning_TA_Session.ipynb` — AlexNet, VGGNet, ResNet, feature extraction and fine-tuning.</li>
        <li><b>Additional implementation:</b> `Week4/transfer_learning_dlgenai.ipynb` — CIFAR-10 classification and CNN experiments.</li>
        <li><b>Reference implementation:</b> `Week - 3 &amp; 4/Transfer_Learning.ipynb` and `Week - 3 &amp; 4/Image_Segmentation_UNET.ipynb` from the lecture-notebook archive.</li>
        <li><b>Week 3 context:</b> `Week - 3 &amp; 4/CNN_Fundamentals.ipynb` and `Week3/Week3_CNN_Live_Coding.ipynb`.</li>
      </ul>
      <div class="note"><b>Assignment accuracy:</b> the supplied archives contained lecture notebooks and slides, but no separate clearly identified Week 4 graded-assignment question sheet was found in the listed materials. The questions in this page are therefore labelled as additional practice, not official assignment questions.</div>
    </section>
  </article>
</main>
<footer class="site-footer">IIT Madras BS Data Science · BSDA2001 — Introduction to Deep Learning and Generative AI<br>Study the source-aligned topics, run the notebooks, and verify tensor shapes on a real batch.</footer>
</template>

<script>
import SiteHeader from '../components/SiteHeader.vue';
import CourseSidebar from '../components/CourseSidebar.vue';

export default {
  components: { SiteHeader, CourseSidebar },
};
</script>
