<template>
<SiteHeader page="week3" />

<main class="page-layout">

<CourseSidebar page="week3" />

<article class="content">

    <div class="note"><b>Course materials checked:</b> These notes have now been cross-checked against the uploaded Week 3 resources, including <code>Week3_CNN_Live_Coding.ipynb</code>, <code>Basic_CNN_Demo.ipynb</code>, <code>CNN_Fundamentals.ipynb</code>, and the Week 3 CNN slides/refresher. The source sequence covers why MLPs struggle with images, convolution and filters, pooling, CNN implementation/training, and visualising learned filters and feature maps. The notes below expand those concepts for revision; practice questions are newly written unless explicitly identified otherwise.</div>

<div class="intro-card" id="overview">
    <h2>Coding Resources</h2>
    <a href="https://colab.research.google.com/drive/18KA905ikgzKeMUHKG2U_FhQS3LHNpuXz" target="_blank">Basic_CNN_Demo.ipynb</a>
    <p><a href="https://colab.research.google.com/drive/1y0H5vklYulhVbfYkTOCoA1PJGs1w6aae">Week3_CNN_Live_Coding.ipynb</a></p>
    <h2>Week 3 Overview</h2>
    <p>This week focuses on using Convolutional Neural Networks (CNNs) for image and visual data. You will learn why ordinary fully connected neural networks are often inefficient for images, how convolution and pooling work, and how to implement a CNN using PyTorch.</p>

    <h3>Learning objectives</h3>
    <ul>
        <li>Explain why images need spatially aware models.</li>
        <li>Understand filters, feature maps, receptive fields, stride, padding, and kernels.</li>
        <li>Calculate output dimensions after convolution and pooling.</li>
        <li>Calculate the number of trainable parameters in a convolutional layer.</li>
        <li>Implement convolution, pooling, and a basic CNN in PyTorch.</li>
        <li>Prepare images, use a <code>DataLoader</code>, train a CNN, and evaluate its predictions.</li>
    </ul>

    <div class="callout warning">
        <strong>Source status:</strong> Drive slides and live-lecture resources could not be accessed, so the supplied Week 3 checklist and general CNN/PyTorch knowledge are the only available basis for this page. The existing practice questions are study questions and are not verified against an official assignment file.
    </div>
</div>

<section id="vision">
    <h2>1. Introduction to Vision Modelling</h2>

    <h3>1.1 What is computer vision?</h3>
    <p><strong>Computer vision</strong> is a field of artificial intelligence that enables computers to extract information and make predictions from images or videos.</p>

    <p>Examples include:</p>
    <ul>
        <li>Image classification: identifying whether an image contains a cat, dog, or car.</li>
        <li>Object detection: finding objects and their locations in an image.</li>
        <li>Image segmentation: assigning a class to each pixel.</li>
        <li>Face recognition: matching a face to a known identity.</li>
        <li>Medical imaging: identifying possible abnormalities in scans.</li>
    </ul>

    <h3>1.2 How is an image represented numerically?</h3>
    <p>A computer does not directly understand an image as a human does. An image is represented as numerical pixel values.</p>

    <ul>
        <li><strong>Grayscale image:</strong> one intensity value per pixel, commonly represented between 0 and 255 in an 8-bit image.</li>
        <li><strong>RGB image:</strong> three channels representing red, green, and blue.</li>
        <li><strong>Image dimensions:</strong> height, width, and number of channels.</li>
    </ul>

    <table>
        <thead>
            <tr><th>Image</th><th>Height</th><th>Width</th><th>Channels</th><th>Pixel values</th></tr>
        </thead>
        <tbody>
            <tr><td>Grayscale</td><td>28</td><td>28</td><td>1</td><td>784 values</td></tr>
            <tr><td>RGB</td><td>32</td><td>32</td><td>3</td><td>3,072 values</td></tr>
            <tr><td>RGB</td><td>224</td><td>224</td><td>3</td><td>150,528 values</td></tr>
        </tbody>
    </table>

    <p>For an RGB image of shape <code>(H, W, C) = (32, 32, 3)</code>, the total number of pixel values is:</p>
    <div class="formula">Total values = H × W × C = 32 × 32 × 3 = 3,072</div>

    <h3>1.3 Why use a vision model?</h3>
    <p>Image understanding depends on patterns such as edges, corners, textures, shapes, and spatial arrangements. A useful model should learn these patterns from pixel values instead of requiring manually designed rules.</p>

    <div class="callout success">
        <strong>Key idea:</strong> CNNs are designed to exploit local spatial patterns and reuse the same learned filters at different image locations.
    </div>
</section>

<section id="mlp-cnn">
    <h2>2. From MLP to Convolution</h2>

    <h3>2.1 What is an MLP?</h3>
    <p>A <strong>Multilayer Perceptron (MLP)</strong> is a neural network made of fully connected layers. Each neuron in one layer connects to every neuron in the next layer.</p>

    <p>A typical MLP layer computes:</p>
    <div class="formula">y = Wx + b</div>
    <p>Here, <code>x</code> is the input vector, <code>W</code> is the weight matrix, <code>b</code> is the bias, and <code>y</code> is the output before any activation function.</p>

    <h3>2.2 How an MLP handles an image</h3>
    <p>An MLP generally expects a one-dimensional vector. Therefore, a two-dimensional image or three-dimensional colour image is usually flattened.</p>

    <pre><code>import torch

image = torch.randn(3, 32, 32)  # C, H, W
flattened = image.reshape(-1)

print(image.shape)       # torch.Size([3, 32, 32])
print(flattened.shape)   # torch.Size([3072])</code></pre>

    <p>Flattening keeps the pixel values but removes the explicit two-dimensional neighbourhood structure from the input representation.</p>

    <h3>2.3 Limitations of MLPs for images</h3>
    <ol>
        <li><strong>Many parameters:</strong> connecting every pixel to every hidden neuron can be expensive.</li>
        <li><strong>Spatial structure is not explicit:</strong> nearby pixels become separate vector positions, rather than being processed by a local filter.</li>
        <li><strong>Weak spatial inductive bias:</strong> an ordinary dense layer does not automatically apply the same edge detector at every image location.</li>
        <li><strong>Overfitting risk:</strong> a large number of parameters can make learning harder when training data is limited.</li>
        <li><strong>Resolution sensitivity:</strong> the input size of a conventional dense layer is fixed unless the architecture is adjusted.</li>
    </ol>

    <h3>2.4 Why CNNs are better suited to images</h3>
    <p>CNNs use small filters that slide across an image. The same filter weights are reused at many positions, allowing the model to detect a pattern wherever it appears.</p>

    <table>
        <thead><tr><th>Property</th><th>MLP</th><th>CNN</th></tr></thead>
        <tbody>
            <tr><td>Connections</td><td>Usually fully connected</td><td>Local connections in convolution layers</td></tr>
            <tr><td>Weights</td><td>Typically separate weights for input positions</td><td>Shared filter weights across spatial positions</td></tr>
            <tr><td>Spatial locality</td><td>Not built into a dense layer</td><td>Built into local convolution operations</td></tr>
            <tr><td>Parameter efficiency</td><td>Can be very large for images</td><td>Often more parameter-efficient for image features</td></tr>
            <tr><td>Typical use</td><td>Tabular data, vector inputs, classification heads</td><td>Images and other grid-like data</td></tr>
        </tbody>
    </table>

    <h3>2.5 Parameter-count comparison</h3>
    <p>Suppose an RGB image is 32 × 32 and a fully connected layer maps its flattened 3,072 values to 100 neurons.</p>
    <div class="formula">MLP parameters = 3,072 × 100 + 100 = 307,300</div>

    <p>Now consider a convolution layer with 16 filters of size 3 × 3 on a 3-channel image:</p>
    <div class="formula">CNN parameters = (3 × 3 × 3 + 1) × 16 = 448</div>

    <p>The convolution layer has far fewer parameters. This comparison is between one specific dense layer and one specific convolution layer; their output shapes and functions are not identical.</p>
</section>

<section id="filters">
    <h2>3. Filters, Feature Maps and Convolution Kernels</h2>

    <h3>3.1 What is a filter or kernel?</h3>
    <p>A <strong>kernel</strong> or <strong>filter</strong> is a small array of learnable weights that is applied to local regions of an input image. In a CNN, filters learn to respond to patterns useful for the training task.</p>

    <p>Common kernel sizes include <code>3 × 3</code>, <code>5 × 5</code>, and <code>7 × 7</code>.</p>

    <h3>3.2 A simple numerical example</h3>
    <p>Suppose an image region is:</p>
    <pre><code>Image patch:
1  2  0
0  1  3
2  1  0

Kernel:
1  0
0 -1</code></pre>

    <p>Using a 2 × 2 kernel on the top-left patch gives:</p>
    <div class="formula">1×1 + 2×0 + 0×0 + 1×(-1) = 0</div>

    <p>The kernel moves to another location, repeats the multiplication-and-sum operation, and produces an output value at each valid position.</p>

    <div class="callout warning">
        In deep-learning libraries, the operation commonly called convolution is usually implemented as <strong>cross-correlation</strong>: the kernel is applied without first flipping it. Many introductory explanations still use the word convolution for this operation.
    </div>

    <h3>3.3 What does a filter learn?</h3>
    <p>Different learned filters may respond to different patterns, such as:</p>
    <ul>
        <li>Horizontal or vertical edges.</li>
        <li>Diagonal boundaries.</li>
        <li>Texture patterns.</li>
        <li>Curves and corners.</li>
        <li>Parts of objects in deeper layers.</li>
    </ul>
    <p>These are intuitive examples, not a guarantee that each learned filter has one clean human-interpretable purpose.</p>

    <h3>3.4 What is a feature map?</h3>
    <p>A <strong>feature map</strong> is the output produced by applying a filter to an input. A convolution layer with 16 output filters typically produces 16 output feature maps, represented as 16 output channels.</p>

    <div class="diagram">
        Input image (3 channels)<br>
        ↓<br>
        Convolution with 16 filters<br>
        ↓<br>
        Output feature maps (16 channels)
    </div>

    <p>For example, an input tensor with shape <code>(N, 3, 32, 32)</code> passed through a suitable convolution layer may produce <code>(N, 16, 32, 32)</code>.</p>

    <p><strong>Important distinction:</strong> the number of output channels is determined by <code>out_channels</code>, not by the height or width of the image.</p>
</section>

<section id="receptive-field">
    <h2>4. Receptive Field</h2>

    <h3>4.1 Definition</h3>
    <p>The <strong>receptive field</strong> of a neuron is the region of the original input that can influence that neuron's value.</p>

    <p>In an initial convolution layer, a neuron may depend on a small local patch. In deeper layers, each neuron can depend on a much larger region because the preceding features already summarize neighbouring input regions.</p>

    <h3>4.2 Receptive field for a single convolution</h3>
    <p>For a single convolution with a 3 × 3 kernel and stride 1, one output location depends on a 3 × 3 region of the input.</p>
    <p>For a 5 × 5 kernel and stride 1, the receptive field is 5 × 5.</p>

    <h3>4.3 Receptive field across multiple layers</h3>
    <p>For a sequence of layers, a useful one-dimensional recurrence is:</p>
    <div class="formula">
        jₗ = jₗ₋₁ × sₗ<br>
        rₗ = rₗ₋₁ + (kₗ − 1) × jₗ₋₁
    </div>
    <p>Where:</p>
    <ul>
        <li><code>r</code> is receptive field size.</li>
        <li><code>j</code> is the effective spacing (jump) between neighbouring features measured in input pixels.</li>
        <li><code>k</code> is kernel size.</li>
        <li><code>s</code> is stride.</li>
    </ul>
    <p>Start with <code>r₀ = 1</code> and <code>j₀ = 1</code> for individual input pixels.</p>

    <h4>Worked example</h4>
    <p>Consider two 3 × 3 convolutions, both with stride 1.</p>
    <ul>
        <li>Input: receptive field = 1.</li>
        <li>After first convolution: <code>r₁ = 1 + (3 − 1) × 1 = 3</code>.</li>
        <li>After second convolution: <code>r₂ = 3 + (3 − 1) × 1 = 5</code>.</li>
    </ul>
    <p>The theoretical receptive field is 5 × 5. This calculation describes which input positions can influence an output; it does not mean all positions have equal influence.</p>

    <div class="callout success">
        <strong>GA tip:</strong> Count the influence of earlier layers. Do not simply add kernel sizes without considering the stride of preceding layers.
    </div>
</section>

<section id="hyperparameters">
    <h2>5. CNN Hyperparameters</h2>

    <p>Hyperparameters control how a convolution layer processes an image. They are chosen by the model designer, rather than learned as ordinary weights through backpropagation.</p>

    <table>
        <thead><tr><th>Hyperparameter</th><th>Meaning</th><th>Effect</th></tr></thead>
        <tbody>
            <tr><td><code>in_channels</code></td><td>Number of input channels</td><td>Must match the input tensor's channel dimension.</td></tr>
            <tr><td><code>out_channels</code></td><td>Number of filters</td><td>Determines the output channel count.</td></tr>
            <tr><td><code>kernel_size</code></td><td>Spatial size of each filter</td><td>Controls the local region processed at each position.</td></tr>
            <tr><td><code>stride</code></td><td>Step size as the kernel moves</td><td>Larger stride generally reduces output dimensions.</td></tr>
            <tr><td><code>padding</code></td><td>Extra values added around the input border</td><td>Can preserve dimensions and change border handling.</td></tr>
            <tr><td><code>dilation</code></td><td>Spacing between kernel elements</td><td>Expands the effective kernel coverage.</td></tr>
            <tr><td><code>groups</code></td><td>Splits channels into groups</td><td>Changes channel connectivity and parameter count.</td></tr>
            <tr><td><code>bias</code></td><td>Whether each output channel has a bias</td><td>Adds one learnable bias per output channel when enabled.</td></tr>
        </tbody>
    </table>

    <h3>5.1 Kernel size</h3>
    <p>A larger kernel covers a larger local area and generally has more weights. A 3 × 3 kernel is common because it captures local patterns with relatively few parameters.</p>

    <h3>5.2 Stride</h3>
    <p>Stride tells the kernel how many pixels to move at each step. Stride 1 examines adjacent positions; stride 2 skips positions and often downsamples the feature map.</p>

    <h3>5.3 Padding</h3>
    <p>Padding adds values around the border, commonly zeros. With a 3 × 3 kernel, stride 1, and padding 1, height and width are preserved.</p>

    <h3>5.4 Output-size formula</h3>
    <p>For one spatial dimension, using dilation:</p>
    <div class="formula">
        Output size = floor((Input + 2P − D(K − 1) − 1) / S + 1)
    </div>
    <p>Where <code>Input</code> is input height or width, <code>P</code> is padding, <code>D</code> is dilation, <code>K</code> is kernel size, and <code>S</code> is stride.</p>

    <p>For the common case where dilation is 1:</p>
    <div class="formula">
        Output size = floor((Input + 2P − K) / S + 1)
    </div>

    <h4>Example 1: No padding</h4>
    <p>Input = 32, kernel = 3, stride = 1, padding = 0.</p>
    <div class="formula">floor((32 + 0 − 3) / 1 + 1) = 30</div>
    <p>Output dimension: 30.</p>

    <h4>Example 2: Padding preserves size</h4>
    <p>Input = 32, kernel = 3, stride = 1, padding = 1.</p>
    <div class="formula">floor((32 + 2 − 3) / 1 + 1) = 32</div>
    <p>Output dimension: 32.</p>

    <h4>Example 3: Stride 2</h4>
    <p>Input = 32, kernel = 3, stride = 2, padding = 1.</p>
    <div class="formula">floor((32 + 2 − 3) / 2 + 1) = 16</div>
    <p>Output dimension: 16.</p>

    <div class="callout warning">
        Calculate height and width separately for rectangular inputs or non-square kernels. Do not assume the output is square unless the inputs and parameters make it square.
    </div>
</section>

<section id="layers">
    <h2>6. CNN Network Layers</h2>

    <h3>6.1 Convolution layer</h3>
    <p>A convolution layer applies learned filters to the input tensor. In PyTorch, a standard two-dimensional convolution is represented by <code>nn.Conv2d</code>.</p>

    <pre><code>import torch.nn as nn

conv = nn.Conv2d(
    in_channels=3,
    out_channels=16,
    kernel_size=3,
    stride=1,
    padding=1
)</code></pre>

    <p>This layer expects a four-dimensional input shaped like <code>(batch_size, 3, height, width)</code> and returns 16 output channels.</p>

    <h3>6.2 Activation layer</h3>
    <p>Activation functions introduce non-linearity. Without non-linear activations, stacking only linear transformations remains equivalent to a single linear transformation (assuming no intervening nonlinear operation).</p>

    <pre><code>relu = nn.ReLU()
output = relu(features)</code></pre>

    <p><strong>ReLU</strong> computes <code>max(0, x)</code> element by element.</p>

    <table>
        <thead><tr><th>Activation</th><th>Behaviour</th><th>Common note</th></tr></thead>
        <tbody>
            <tr><td>ReLU</td><td><code>max(0, x)</code></td><td>Common in hidden CNN layers.</td></tr>
            <tr><td>Sigmoid</td><td>Maps values to (0, 1)</td><td>Often used for binary probability outputs, or combined with BCE-with-logits appropriately.</td></tr>
            <tr><td>Tanh</td><td>Maps values to (-1, 1)</td><td>Centred around zero.</td></tr>
            <tr><td>Leaky ReLU</td><td>Allows a small negative slope</td><td>Reduces the zero-gradient region for negative inputs.</td></tr>
        </tbody>
    </table>

    <h3>6.3 Pooling layer</h3>
    <p>Pooling aggregates values over local windows, often reducing height and width. Standard pooling layers have no learnable filter weights.</p>

    <ul>
        <li><strong>Max pooling:</strong> takes the largest value in each window.</li>
        <li><strong>Average pooling:</strong> takes the mean value in each window.</li>
    </ul>

    <h3>6.4 Flatten layer</h3>
    <p>Flatten converts each sample's multi-dimensional feature tensor into a one-dimensional vector, typically before a fully connected classification head.</p>

    <pre><code>flatten = nn.Flatten()

# (batch_size, 64, 8, 8) becomes (batch_size, 4096)
x = flatten(x)</code></pre>

    <h3>6.5 Fully connected layer</h3>
    <p>A fully connected layer combines the extracted features to produce class scores or another prediction.</p>

    <pre><code>classifier = nn.Linear(64 * 8 * 8, 10)</code></pre>

    <p>This example expects 4,096 input features per image and produces 10 outputs, commonly one score per class.</p>

    <h3>6.6 Softmax and class scores</h3>
    <p>A classification model commonly returns <strong>logits</strong>, which are raw class scores. For mutually exclusive classes, <code>nn.CrossEntropyLoss</code> expects these logits and integer class labels. It performs the appropriate log-softmax and loss calculation internally.</p>

    <div class="callout danger">
        Do not apply <code>softmax</code> before passing logits to <code>nn.CrossEntropyLoss</code> in the standard classification setup. Pass the raw logits directly.
    </div>
</section>

<section id="architecture">
    <h2>7. CNN Architecture and Data Augmentation</h2>

    <h3>7.1 A typical CNN architecture</h3>
    <div class="diagram">
        Input Image<br>
        ↓<br>
        Convolution → ReLU<br>
        ↓<br>
        Pooling<br>
        ↓<br>
        Convolution → ReLU<br>
        ↓<br>
        Pooling<br>
        ↓<br>
        Flatten<br>
        ↓<br>
        Fully Connected Layer<br>
        ↓<br>
        Class Logits
    </div>

    <p>The early layers typically learn simpler local patterns. Deeper layers combine earlier features into more complex representations. The final classification head uses those representations to predict classes.</p>

    <h3>7.2 Why stack convolution layers?</h3>
    <ul>
        <li>Multiple layers allow the model to build hierarchical representations.</li>
        <li>Nonlinear activations allow more complex functions to be learned.</li>
        <li>Stacking layers can increase the receptive field.</li>
        <li>Pooling or strided convolution can reduce spatial dimensions and computation.</li>
    </ul>

    <h3>7.3 What is data augmentation?</h3>
    <p><strong>Data augmentation</strong> creates varied training examples from existing data using transformations that preserve the relevant label.</p>

    <table>
        <thead><tr><th>Technique</th><th>What it does</th><th>When it may help</th></tr></thead>
        <tbody>
            <tr><td>Horizontal flip</td><td>Mirrors the image horizontally</td><td>Objects whose label is unchanged by horizontal reflection.</td></tr>
            <tr><td>Rotation</td><td>Rotates the image</td><td>Tasks where moderate rotation does not change the class.</td></tr>
            <tr><td>Random crop</td><td>Selects a crop and often resizes it</td><td>Encourages robustness to object position and framing.</td></tr>
            <tr><td>Resize</td><td>Changes spatial dimensions</td><td>Creates the input size required by the model.</td></tr>
            <tr><td>Color jitter</td><td>Changes brightness, contrast, saturation, or hue</td><td>Can help with reasonable lighting or colour variation.</td></tr>
            <tr><td>Normalization</td><td>Rescales channel values using chosen statistics</td><td>Provides a consistent input scale.</td></tr>
        </tbody>
    </table>

    <h3>7.4 Why augmentation helps</h3>
    <ul>
        <li>Reduces over-reliance on exact training-image appearance.</li>
        <li>Encourages robustness to realistic variations.</li>
        <li>Can reduce overfitting by increasing the variety of training examples.</li>
    </ul>

    <div class="callout warning">
        <strong>Label preservation matters.</strong> A transformation is appropriate only if it keeps the correct label. For example, a vertical flip may be unsuitable for some natural-image tasks, and flipping medical images may be unsafe if left/right orientation changes the meaning.
    </div>

    <h3>7.5 Training and validation transforms</h3>
    <p>Random augmentation is usually applied to the training data. Validation and test data generally use deterministic preprocessing, so evaluation remains consistent.</p>

    <pre><code>from torchvision import transforms

train_transform = transforms.Compose([
    transforms.Resize((32, 32)),
    transforms.RandomHorizontalFlip(p=0.5),
    transforms.ToTensor(),
    transforms.Normalize(
        mean=(0.5, 0.5, 0.5),
        std=(0.5, 0.5, 0.5)
    )
])

eval_transform = transforms.Compose([
    transforms.Resize((32, 32)),
    transforms.ToTensor(),
    transforms.Normalize(
        mean=(0.5, 0.5, 0.5),
        std=(0.5, 0.5, 0.5)
    )
])</code></pre>

    <p class="small">The three-channel normalization values are illustrative. In practice, choose values appropriate to the dataset and any pretrained model requirements.</p>
</section>

<section id="conv-scratch">
    <h2>8. Convolution from Scratch</h2>

    <h3>8.1 The basic operation</h3>
    <p>For each valid output location, multiply corresponding values in the input patch and kernel, then sum the products. Repeat this as the kernel slides across the image.</p>

    <p>For a single-channel input, stride 1, no padding, and a square kernel, the output is obtained by evaluating every valid kernel position.</p>

    <h3>8.2 Manual calculation</h3>
    <pre><code>Input:
1  2  3
4  5  6
7  8  9

Kernel:
1  0
0 -1</code></pre>

    <p>Top-left output:</p>
    <div class="formula">1×1 + 2×0 + 4×0 + 5×(-1) = -4</div>

    <p>Top-right output:</p>
    <div class="formula">2×1 + 3×0 + 5×0 + 6×(-1) = -4</div>

    <p>Bottom-left output:</p>
    <div class="formula">4×1 + 5×0 + 7×0 + 8×(-1) = -4</div>

    <p>Bottom-right output:</p>
    <div class="formula">5×1 + 6×0 + 8×0 + 9×(-1) = -4</div>

    <p>Output:</p>
    <pre><code>-4  -4
-4  -4</code></pre>

    <h3>8.3 Implementing a simple convolution with loops</h3>
    <p>This example is for understanding only. It handles one two-dimensional input and one two-dimensional kernel, with stride 1 and no padding.</p>

    <pre><code>import torch

def conv2d_scratch(image, kernel):
    # image: 2D tensor (H, W)
    # kernel: 2D tensor (KH, KW)

    H, W = image.shape
    KH, KW = kernel.shape

    out_h = H - KH + 1
    out_w = W - KW + 1

    output = torch.zeros(
        (out_h, out_w),
        dtype=image.dtype
    )

    for i in range(out_h):
        for j in range(out_w):
            patch = image[i:i+KH, j:j+KW]
            output[i, j] = (patch * kernel).sum()

    return output


image = torch.tensor([
    [1., 2., 3.],
    [4., 5., 6.],
    [7., 8., 9.]
])

kernel = torch.tensor([
    [1., 0.],
    [0., -1.]
])

print(conv2d_scratch(image, kernel))</code></pre>

    <h3>8.4 Limitations of this scratch implementation</h3>
    <ul>
        <li>It supports only one two-dimensional input and one filter.</li>
        <li>It does not implement stride, padding, dilation, batches, or multiple channels.</li>
        <li>It does not learn the kernel weights.</li>
        <li>It is intended to demonstrate the calculation, not replace optimized PyTorch operations.</li>
    </ul>

    <h3>8.5 Multi-channel convolution concept</h3>
    <p>For an RGB input, a single standard convolution filter covers all three input channels. The contributions from the channels are combined to produce one output channel.</p>

    <div class="formula">
        One filter's weights = Kₕ × Kᵥ × Cᵢ
    </div>

    <p>With 3 input channels and a 3 × 3 kernel, each filter has 27 weight values, plus one bias if bias is enabled.</p>
</section>

<section id="pool-scratch">
    <h2>9. Pooling from Scratch</h2>

    <h3>9.1 Max pooling</h3>
    <p>Max pooling takes the largest value in each local window. For a 2 × 2 window:</p>

    <pre><code>Input:
1  3  2  4
5  6  1  2
7  2  8  9
3  4  5  6

2×2 max pooling, stride 2:

6  4
7  9</code></pre>

    <p>Explanation:</p>
    <ul>
        <li>Top-left window <code>[[1,3],[5,6]]</code> → maximum = 6.</li>
        <li>Top-right window <code>[[2,4],[1,2]]</code> → maximum = 4.</li>
        <li>Bottom-left window <code>[[7,2],[3,4]]</code> → maximum = 7.</li>
        <li>Bottom-right window <code>[[8,9],[5,6]]</code> → maximum = 9.</li>
    </ul>

    <h3>9.2 Average pooling</h3>
    <p>Average pooling takes the arithmetic mean of each window.</p>
    <p>For the top-left 2 × 2 window:</p>
    <div class="formula">(1 + 3 + 5 + 6) / 4 = 3.75</div>

    <h3>9.3 Pooling from scratch in PyTorch</h3>
    <pre><code>import torch

def max_pool2d_scratch(image, pool_size=2, stride=2):
    H, W = image.shape

    out_h = (H - pool_size) // stride + 1
    out_w = (W - pool_size) // stride + 1

    output = torch.empty((out_h, out_w), dtype=image.dtype)

    for i in range(out_h):
        for j in range(out_w):
            patch = image[
                i * stride:i * stride + pool_size,
                j * stride:j * stride + pool_size
            ]
            output[i, j] = patch.max()

    return output


def avg_pool2d_scratch(image, pool_size=2, stride=2):
    H, W = image.shape

    out_h = (H - pool_size) // stride + 1
    out_w = (W - pool_size) // stride + 1

    output = torch.empty((out_h, out_w), dtype=image.dtype)

    for i in range(out_h):
        for j in range(out_w):
            patch = image[
                i * stride:i * stride + pool_size,
                j * stride:j * stride + pool_size
            ]
            output[i, j] = patch.float().mean()

    return output</code></pre>

    <p>These implementations assume a two-dimensional input, no padding, and square pooling windows. They use floor-based output dimensions and ignore incomplete border windows.</p>

    <h3>9.4 Convolution versus pooling</h3>
    <table>
        <thead><tr><th>Convolution</th><th>Pooling</th></tr></thead>
        <tbody>
            <tr><td>Uses a filter whose weights are usually learned.</td><td>Usually uses a fixed aggregation rule.</td></tr>
            <tr><td>Can learn feature detectors.</td><td>Summarizes local feature values.</td></tr>
            <tr><td>Can change channel count.</td><td>Usually preserves channel count.</td></tr>
            <tr><td>Has trainable parameters in a standard learned layer.</td><td>Standard max and average pooling have no learned kernel weights.</td></tr>
            <tr><td>Output size depends on kernel, stride, padding, and dilation.</td><td>Output size depends on pooling window, stride, padding, and related settings.</td></tr>
        </tbody>
    </table>
</section>

<section id="conv-pytorch">
    <h2>10. Convolution in PyTorch</h2>

    <h3>10.1 The <code>nn.Conv2d</code> layer</h3>
    <p>PyTorch's <code>nn.Conv2d</code> performs two-dimensional convolution-like cross-correlation on batched image tensors.</p>

    <pre><code>import torch
import torch.nn as nn

conv = nn.Conv2d(
    in_channels=3,
    out_channels=16,
    kernel_size=3,
    stride=1,
    padding=1
)

x = torch.randn(8, 3, 32, 32)
y = conv(x)

print(y.shape)
# torch.Size([8, 16, 32, 32])</code></pre>

    <h3>10.2 Understand the input shape</h3>
    <p>The standard input order for <code>nn.Conv2d</code> is:</p>
    <div class="formula">(N, C, H, W)</div>
    <ul>
        <li><code>N</code>: batch size.</li>
        <li><code>C</code>: input channels.</li>
        <li><code>H</code>: image height.</li>
        <li><code>W</code>: image width.</li>
    </ul>

    <p>For <code>(8, 3, 32, 32)</code>, there are 8 images, each with 3 channels, height 32, and width 32.</p>

    <h3>10.3 What the output shape tells us</h3>
    <p>Given <code>nn.Conv2d(3, 16, kernel_size=3, stride=1, padding=1)</code>:</p>
    <ul>
        <li>Batch size remains 8.</li>
        <li>Output channels become 16.</li>
        <li>Height remains 32.</li>
        <li>Width remains 32.</li>
    </ul>

    <h3>10.4 Using different parameters</h3>
    <pre><code>conv = nn.Conv2d(
    in_channels=3,
    out_channels=32,
    kernel_size=5,
    stride=2,
    padding=2
)

x = torch.randn(4, 3, 64, 64)
y = conv(x)

print(y.shape)
# torch.Size([4, 32, 32, 32])</code></pre>

    <p>Output height and width are 32 because:</p>
    <div class="formula">floor((64 + 2×2 − 5) / 2 + 1) = 32</div>

    <h3>10.5 Convolution layer parameters</h3>
    <p>For a standard convolution with groups = 1:</p>
    <div class="formula">
        Parameters = (Cᵢ × Kₕ × Kᵥ + 1) × Cₒ
    </div>
    <p>This assumes bias is enabled. Without bias:</p>
    <div class="formula">Parameters = Cᵢ × Kₕ × Kᵥ × Cₒ</div>

    <p>Example: 3 input channels, 16 output channels, kernel 3 × 3, bias enabled.</p>
    <div class="formula">(3 × 3 × 3 + 1) × 16 = 448 parameters</div>

    <h3>10.6 Checking trainable parameters</h3>
    <pre><code>conv = nn.Conv2d(3, 16, kernel_size=3, padding=1)

total = sum(p.numel() for p in conv.parameters())
print(total)  # 448</code></pre>
</section>

<section id="pool-pytorch">
    <h2>11. Pooling in PyTorch</h2>

    <h3>11.1 Max pooling</h3>
    <pre><code>import torch
import torch.nn as nn

pool = nn.MaxPool2d(kernel_size=2, stride=2)

x = torch.randn(4, 16, 32, 32)
y = pool(x)

print(y.shape)
# torch.Size([4, 16, 16, 16])</code></pre>

    <p>The spatial dimensions are halved in this example. Batch size and channel count remain unchanged.</p>

    <h3>11.2 Average pooling</h3>
    <pre><code>pool = nn.AvgPool2d(kernel_size=2, stride=2)

x = torch.randn(4, 16, 32, 32)
y = pool(x)

print(y.shape)
# torch.Size([4, 16, 16, 16])</code></pre>

    <h3>11.3 Pooling output dimensions</h3>
    <p>For standard pooling with dilation 1, the common output-size formula is:</p>
    <div class="formula">
        Output = floor((Input + 2P − K) / S + 1)
    </div>

    <p>For input size 28, kernel 2, stride 2, padding 0:</p>
    <div class="formula">floor((28 − 2) / 2 + 1) = 14</div>

    <h3>11.4 Important pooling details</h3>
    <ul>
        <li>Pooling usually operates independently on each channel.</li>
        <li>It normally changes height and width, not the number of channels.</li>
        <li>Pooling layers do not have trainable filter weights in their standard form.</li>
        <li>When dimensions do not divide evenly, the output-size calculation uses floor behaviour in the usual setup.</li>
    </ul>

    <div class="callout warning">
        For non-default settings such as padding or <code>ceil_mode=True</code>, carefully use the exact PyTorch layer settings rather than assuming every pooling layer simply halves the dimensions.
    </div>
</section>

<section id="simple-cnn">
    <h2>12. CNN Image Classification: Simple CNN Implementation</h2>

    <h3>12.1 Architecture design</h3>
    <p>We will build a CNN for 32 × 32 RGB images and 10 classes.</p>

    <table>
        <thead><tr><th>Layer</th><th>Output shape (per batch)</th><th>Purpose</th></tr></thead>
        <tbody>
            <tr><td>Input</td><td><code>(N, 3, 32, 32)</code></td><td>RGB image batch.</td></tr>
            <tr><td>Conv 3 → 16, 3×3, padding 1</td><td><code>(N, 16, 32, 32)</code></td><td>Extract local features.</td></tr>
            <tr><td>ReLU</td><td><code>(N, 16, 32, 32)</code></td><td>Add non-linearity.</td></tr>
            <tr><td>MaxPool 2×2, stride 2</td><td><code>(N, 16, 16, 16)</code></td><td>Reduce spatial size.</td></tr>
            <tr><td>Conv 16 → 32, 3×3, padding 1</td><td><code>(N, 32, 16, 16)</code></td><td>Learn richer features.</td></tr>
            <tr><td>ReLU</td><td><code>(N, 32, 16, 16)</code></td><td>Add non-linearity.</td></tr>
            <tr><td>MaxPool 2×2, stride 2</td><td><code>(N, 32, 8, 8)</code></td><td>Reduce spatial size again.</td></tr>
            <tr><td>Flatten</td><td><code>(N, 2048)</code></td><td>Convert features into vectors.</td></tr>
            <tr><td>Linear 2048 → 10</td><td><code>(N, 10)</code></td><td>Produce 10 class logits.</td></tr>
        </tbody>
    </table>

    <h3>12.2 Complete model code</h3>
    <pre><code>import torch
import torch.nn as nn

class SimpleCNN(nn.Module):
    def __init__(self, num_classes=10):
        super().__init__()

        self.features = nn.Sequential(
            nn.Conv2d(
                in_channels=3,
                out_channels=16,
                kernel_size=3,
                stride=1,
                padding=1
            ),
            nn.ReLU(),
            nn.MaxPool2d(kernel_size=2, stride=2),

            nn.Conv2d(
                in_channels=16,
                out_channels=32,
                kernel_size=3,
                stride=1,
                padding=1
            ),
            nn.ReLU(),
            nn.MaxPool2d(kernel_size=2, stride=2)
        )

        self.classifier = nn.Sequential(
            nn.Flatten(),
            nn.Linear(32 * 8 * 8, num_classes)
        )

    def forward(self, x):
        x = self.features(x)
        x = self.classifier(x)
        return x


model = SimpleCNN(num_classes=10)

sample = torch.randn(4, 3, 32, 32)
logits = model(sample)

print(logits.shape)
# torch.Size([4, 10])</code></pre>

    <h3>12.3 Why is the linear input size 2048?</h3>
    <p>After the second pooling layer, each image has 32 channels, height 8, and width 8.</p>
    <div class="formula">32 × 8 × 8 = 2,048 features per image</div>

    <p>Therefore, the classifier uses <code>nn.Linear(2048, 10)</code>.</p>

    <h3>12.4 Why does the model return logits?</h3>
    <p>The output has shape <code>(batch_size, num_classes)</code>. Each row contains the scores for one image. The scores are not necessarily probabilities and do not need to sum to one.</p>

    <pre><code>logits = model(images)              # raw class scores
predictions = logits.argmax(dim=1)  # predicted class index</code></pre>
</section>

<section id="preprocessing">
    <h2>13. Data Preprocessing and DataLoaders</h2>

    <h3>13.1 Why preprocess images?</h3>
    <p>Images may have different sizes, pixel ranges, and representations. Preprocessing converts them into a consistent format suitable for the model.</p>

    <ul>
        <li>Resize or crop images to the required dimensions.</li>
        <li>Convert image data into tensors.</li>
        <li>Scale pixel values appropriately.</li>
        <li>Normalize channels when suitable.</li>
        <li>Apply training-time augmentation when appropriate.</li>
    </ul>

    <h3>13.2 Convert an image to a tensor</h3>
    <pre><code>from torchvision import transforms

transform = transforms.Compose([
    transforms.Resize((32, 32)),
    transforms.ToTensor()
])</code></pre>

    <p>For a typical PIL image, <code>ToTensor()</code> converts it to a channel-first tensor and usually scales uint8 pixel values from 0–255 into floating-point values in [0, 1]. The exact behaviour depends on the input type.</p>

    <h3>13.3 Normalization</h3>
    <p>For a channel value <code>x</code>, normalization commonly uses:</p>
    <div class="formula">x_normalized = (x − mean) / std</div>

    <p>Here, <code>mean</code> and <code>std</code> are chosen per channel. A value of 0.5 for both means and standard deviations maps values originally in [0, 1] approximately into [-1, 1].</p>

    <pre><code>transform = transforms.Compose([
    transforms.Resize((32, 32)),
    transforms.ToTensor(),
    transforms.Normalize(
        mean=(0.5, 0.5, 0.5),
        std=(0.5, 0.5, 0.5)
    )
])</code></pre>

    <h3>13.4 What is a Dataset?</h3>
    <p>A dataset defines how to access an individual example and its label. A PyTorch dataset commonly implements:</p>
    <ul>
        <li><code>__len__()</code>: number of examples.</li>
        <li><code>__getitem__(index)</code>: returns one example and its label.</li>
    </ul>

    <p>PyTorch provides utilities such as <code>TensorDataset</code> and <code>torchvision.datasets.ImageFolder</code>. Custom datasets can also load data from files or other sources.</p>

    <h3>13.5 What is a DataLoader?</h3>
    <p>A <code>DataLoader</code> groups examples into mini-batches and can shuffle the training data and load data using multiple worker processes.</p>

    <pre><code>from torch.utils.data import DataLoader, TensorDataset
import torch

X = torch.randn(100, 3, 32, 32)
y = torch.randint(0, 10, (100,))

dataset = TensorDataset(X, y)

train_loader = DataLoader(
    dataset,
    batch_size=16,
    shuffle=True
)

for images, labels in train_loader:
    print(images.shape, labels.shape)
    break

# Typical shapes:
# torch.Size([16, 3, 32, 32])
# torch.Size([16])</code></pre>

    <h3>13.6 Important DataLoader arguments</h3>
    <table>
        <thead><tr><th>Argument</th><th>Purpose</th></tr></thead>
        <tbody>
            <tr><td><code>dataset</code></td><td>Dataset from which examples are loaded.</td></tr>
            <tr><td><code>batch_size</code></td><td>Number of examples per batch.</td></tr>
            <tr><td><code>shuffle</code></td><td>Randomizes example order when iterating, typically for training.</td></tr>
            <tr><td><code>num_workers</code></td><td>Number of subprocesses used for data loading.</td></tr>
            <tr><td><code>drop_last</code></td><td>Whether to discard the final incomplete batch.</td></tr>
            <tr><td><code>pin_memory</code></td><td>Can help host-to-GPU transfer in appropriate setups.</td></tr>
        </tbody>
    </table>

    <div class="callout success">
        <strong>Common practice:</strong> use <code>shuffle=True</code> for training and usually <code>shuffle=False</code> for validation and test loaders.
    </div>

    <h3>13.7 Example with ImageFolder</h3>
    <p><code>ImageFolder</code> expects folders organized by class, for example:</p>
    <pre><code>dataset/
    train/
        cat/
        dog/
    val/
        cat/
        dog/</code></pre>

    <pre><code>from torchvision import datasets, transforms
from torch.utils.data import DataLoader

train_transform = transforms.Compose([
    transforms.Resize((32, 32)),
    transforms.RandomHorizontalFlip(),
    transforms.ToTensor()
])

val_transform = transforms.Compose([
    transforms.Resize((32, 32)),
    transforms.ToTensor()
])

train_dataset = datasets.ImageFolder(
    "dataset/train",
    transform=train_transform
)

val_dataset = datasets.ImageFolder(
    "dataset/val",
    transform=val_transform
)

train_loader = DataLoader(
    train_dataset,
    batch_size=32,
    shuffle=True
)

val_loader = DataLoader(
    val_dataset,
    batch_size=32,
    shuffle=False
)

print(train_dataset.classes)</code></pre>

    <p class="small">Folder names determine class labels in alphabetical order by default. Inspect <code>dataset.classes</code> and <code>dataset.class_to_idx</code> rather than assuming a particular mapping.</p>
</section>

<section id="training">
    <h2>14. CNN Image Classification: Model Training</h2>

    <h3>14.1 Training loop overview</h3>
    <div class="diagram">
        Get a batch<br>
        ↓<br>
        Forward pass<br>
        ↓<br>
        Calculate loss<br>
        ↓<br>
        Clear old gradients<br>
        ↓<br>
        Backpropagation<br>
        ↓<br>
        Optimizer updates parameters<br>
        ↓<br>
        Repeat for all batches and epochs
    </div>

    <h3>14.2 Loss function</h3>
    <p>For a multi-class classification problem where each image belongs to exactly one class, a common choice is <code>nn.CrossEntropyLoss()</code>.</p>

    <pre><code>criterion = nn.CrossEntropyLoss()

logits = model(images)   # shape (N, num_classes)
loss = criterion(logits, labels)</code></pre>

    <p>Expected inputs:</p>
    <ul>
        <li><code>logits</code>: floating-point scores of shape <code>(N, C)</code> for a basic single-label classification task.</li>
        <li><code>labels</code>: integer class indices of shape <code>(N,)</code>, normally using dtype <code>torch.long</code>.</li>
    </ul>

    <h3>14.3 Optimizer</h3>
    <p>An optimizer updates trainable parameters using their gradients.</p>

    <pre><code>optimizer = torch.optim.Adam(
    model.parameters(),
    lr=0.001
)</code></pre>

    <p>Other options include SGD, often with momentum. Learning rate controls the size of optimization steps.</p>

    <h3>14.4 Complete training and validation example</h3>
    <pre><code>import torch
import torch.nn as nn

device = torch.device(
    "cuda" if torch.cuda.is_available() else "cpu"
)

model = SimpleCNN(num_classes=10).to(device)

criterion = nn.CrossEntropyLoss()
optimizer = torch.optim.Adam(
    model.parameters(),
    lr=0.001
)

num_epochs = 5

for epoch in range(num_epochs):
    # --------------------
    # Training
    # --------------------
    model.train()

    total_loss = 0.0
    correct = 0
    total = 0

    for images, labels in train_loader:
        images = images.to(device)
        labels = labels.to(device)

        optimizer.zero_grad()

        logits = model(images)
        loss = criterion(logits, labels)

        loss.backward()
        optimizer.step()

        total_loss += loss.item() * images.size(0)

        predictions = logits.argmax(dim=1)
        correct += (predictions == labels).sum().item()
        total += labels.size(0)

    train_loss = total_loss / total
    train_accuracy = correct / total

    # --------------------
    # Validation
    # --------------------
    model.eval()

    val_correct = 0
    val_total = 0
    val_loss_sum = 0.0

    with torch.no_grad():
        for images, labels in val_loader:
            images = images.to(device)
            labels = labels.to(device)

            logits = model(images)
            loss = criterion(logits, labels)

            val_loss_sum += loss.item() * images.size(0)

            predictions = logits.argmax(dim=1)
            val_correct += (predictions == labels).sum().item()
            val_total += labels.size(0)

    val_loss = val_loss_sum / val_total
    val_accuracy = val_correct / val_total

    print(
        f"Epoch {epoch + 1}/{num_epochs} | "
        f"Train Loss: {train_loss:.4f} | "
        f"Train Acc: {train_accuracy:.4f} | "
        f"Val Loss: {val_loss:.4f} | "
        f"Val Acc: {val_accuracy:.4f}"
    )</code></pre>

    <p class="small">This example assumes <code>SimpleCNN</code>, <code>train_loader</code>, and <code>val_loader</code> have already been defined. The training loop should not be run with an empty loader, because the accuracy and loss denominators would be zero.</p>

    <h3>14.5 Understand every training step</h3>
    <ol>
        <li><code>model.train()</code>: enables training behaviour for layers such as dropout and batch normalization.</li>
        <li><code>optimizer.zero_grad()</code>: clears gradients left from the previous batch.</li>
        <li><code>logits = model(images)</code>: performs the forward pass.</li>
        <li><code>loss = criterion(logits, labels)</code>: measures prediction error.</li>
        <li><code>loss.backward()</code>: computes gradients using autograd.</li>
        <li><code>optimizer.step()</code>: updates model parameters.</li>
        <li><code>model.eval()</code>: switches to evaluation behaviour.</li>
        <li><code>torch.no_grad()</code>: disables gradient tracking during validation.</li>
    </ol>

    <h3>14.6 Accuracy</h3>
    <p>For a single-label classification problem, predicted classes are commonly selected with <code>argmax</code> over the class dimension.</p>
    <div class="formula">Accuracy = Correct predictions / Total predictions</div>

    <pre><code>predictions = logits.argmax(dim=1)
accuracy = (predictions == labels).float().mean()</code></pre>

    <h3>14.7 Why training and evaluation modes matter</h3>
    <table>
        <thead><tr><th>Training</th><th>Evaluation</th></tr></thead>
        <tbody>
            <tr><td><code>model.train()</code></td><td><code>model.eval()</code></td></tr>
            <tr><td>Training-time behaviour is enabled.</td><td>Evaluation-time behaviour is enabled.</td></tr>
            <tr><td>Gradients are normally calculated.</td><td>Use <code>torch.no_grad()</code> or inference mode when only evaluating.</td></tr>
            <tr><td>Optimizer updates parameters.</td><td>Do not update parameters during validation.</td></tr>
        </tbody>
    </table>

    <div class="callout danger">
        <strong>Remember:</strong> <code>model.eval()</code> does not itself disable gradient calculation. <code>torch.no_grad()</code> does not itself switch the model to evaluation mode. They serve different purposes.
    </div>
</section>

<section id="shapes">
    <h2>15. Output Shape Calculation: Full Revision</h2>

    <h3>15.1 Standard shape notation</h3>
    <p>For image tensors in PyTorch, use <code>(N, C, H, W)</code>.</p>

    <h3>15.2 Worked architecture</h3>
    <p>Input: <code>(8, 3, 64, 64)</code>.</p>

    <table>
        <thead><tr><th>Operation</th><th>Calculation</th><th>Output shape</th></tr></thead>
        <tbody>
            <tr><td>Input</td><td>Given</td><td><code>(8, 3, 64, 64)</code></td></tr>
            <tr><td>Conv 3→16, K=3, S=1, P=1</td><td>Spatial size remains 64</td><td><code>(8, 16, 64, 64)</code></td></tr>
            <tr><td>MaxPool K=2, S=2</td><td>64 → 32</td><td><code>(8, 16, 32, 32)</code></td></tr>
            <tr><td>Conv 16→32, K=3, S=1, P=1</td><td>Spatial size remains 32</td><td><code>(8, 32, 32, 32)</code></td></tr>
            <tr><td>MaxPool K=2, S=2</td><td>32 → 16</td><td><code>(8, 32, 16, 16)</code></td></tr>
            <tr><td>Flatten</td><td>32 × 16 × 16 = 8192</td><td><code>(8, 8192)</code></td></tr>
            <tr><td>Linear 8192→10</td><td>10 class scores per image</td><td><code>(8, 10)</code></td></tr>
        </tbody>
    </table>

    <h3>15.3 Same padding shortcut</h3>
    <p>For an odd kernel size, stride 1, dilation 1, and padding <code>(K − 1) / 2</code>, the output spatial size is preserved.</p>
    <ul>
        <li>Kernel 3 → padding 1.</li>
        <li>Kernel 5 → padding 2.</li>
        <li>Kernel 7 → padding 3.</li>
    </ul>
    <p>This shortcut assumes the standard symmetric padding setup and stride 1.</p>

    <h3>15.4 Pooling shortcut</h3>
    <p>With kernel 2, stride 2, and no padding, an even spatial dimension is halved.</p>
    <ul>
        <li>32 → 16.</li>
        <li>28 → 14.</li>
        <li>16 → 8.</li>
    </ul>

    <div class="callout warning">
        <strong>Do not confuse channels with spatial dimensions.</strong> A convolution can change channels from 16 to 32 while preserving height and width. A standard pooling layer usually changes height and width while preserving channels.
    </div>
</section>

<section id="parameters">
    <h2>16. Trainable Parameter Calculations</h2>

    <h3>16.1 Convolution layer</h3>
    <p>For a standard convolution with groups = 1 and bias enabled:</p>
    <div class="formula">Parameters = (Cᵢ × Kₕ × Kᵥ + 1) × Cₒ</div>

    <h4>Example A</h4>
    <p>Input channels = 3, output channels = 16, kernel = 3 × 3.</p>
    <div class="formula">(3 × 3 × 3 + 1) × 16 = 448</div>

    <h4>Example B</h4>
    <p>Input channels = 16, output channels = 32, kernel = 3 × 3.</p>
    <div class="formula">(16 × 3 × 3 + 1) × 32 = 4,640</div>

    <h3>16.2 Fully connected layer</h3>
    <p>For a linear layer with <code>in_features</code> inputs and <code>out_features</code> outputs:</p>
    <div class="formula">Parameters = in_features × out_features + out_features</div>

    <p>Example: 2,048 input features and 10 output classes:</p>
    <div class="formula">2,048 × 10 + 10 = 20,490</div>

    <h3>16.3 Do kernel size and image size affect parameter count?</h3>
    <ul>
        <li>Increasing convolution kernel size generally increases the number of filter weights.</li>
        <li>Increasing the number of input or output channels increases convolution parameters.</li>
        <li>Changing image height or width alone does not change the parameter count of a fixed convolution layer.</li>
        <li>Changing image height or width can change the number of inputs to a fully connected layer after flattening.</li>
        <li>Pooling generally has no trainable parameters.</li>
    </ul>
</section>

<section id="mistakes">
    <h2>17. Common CNN and PyTorch Errors</h2>

    <table>
        <thead><tr><th>Error</th><th>Why it happens</th><th>How to fix it</th></tr></thead>
        <tbody>
            <tr>
                <td>Wrong input channels</td>
                <td>The tensor has 3 channels, but the layer expects 1.</td>
                <td>Set <code>in_channels</code> to the tensor's channel count, or convert the image intentionally.</td>
            </tr>
            <tr>
                <td>Wrong tensor order</td>
                <td>Input is NHWC instead of NCHW.</td>
                <td>Use channel-first layout for standard <code>nn.Conv2d</code>.</td>
            </tr>
            <tr>
                <td>Incorrect flatten size</td>
                <td>The fully connected layer expects a different number of features.</td>
                <td>Track every spatial dimension or print the tensor shape before flattening.</td>
            </tr>
            <tr>
                <td>Softmax before CrossEntropyLoss</td>
                <td>Probabilities are passed where raw logits are expected.</td>
                <td>Pass raw logits directly to <code>nn.CrossEntropyLoss</code>.</td>
            </tr>
            <tr>
                <td>Wrong label dtype</td>
                <td>Class-index labels are stored as floating point.</td>
                <td>For ordinary multiclass cross entropy, use integer class indices, normally <code>torch.long</code>.</td>
            </tr>
            <tr>
                <td>Gradients accumulate</td>
                <td>Gradients are not cleared between batches.</td>
                <td>Call <code>optimizer.zero_grad()</code> before backpropagation for each batch.</td>
            </tr>
            <tr>
                <td>Validation updates parameters</td>
                <td>The training optimizer step is mistakenly used in validation.</td>
                <td>Do not call backward or optimizer step during validation.</td>
            </tr>
            <tr>
                <td>CPU/GPU mismatch</td>
                <td>Model and input tensors are on different devices.</td>
                <td>Move the model, images, and labels to the same device.</td>
            </tr>
            <tr>
                <td>Unexpected number of classes</td>
                <td>The final layer output count differs from the dataset classes.</td>
                <td>Set the final layer output features to the required number of classes.</td>
            </tr>
            <tr>
                <td>Validation uses random augmentation</td>
                <td>Evaluation examples change randomly between runs.</td>
                <td>Use deterministic preprocessing for validation and test data.</td>
            </tr>
        </tbody>
    </table>

    <h3>17.1 Debugging tensor shapes</h3>
    <pre><code>def forward(self, x):
    print("Input:", x.shape)

    x = self.features(x)
    print("Features:", x.shape)

    x = torch.flatten(x, start_dim=1)
    print("Flattened:", x.shape)

    x = self.classifier(x)
    print("Output:", x.shape)

    return x</code></pre>

    <p>Remove these debug prints once the shapes are correct, especially during repeated training.</p>

    <h3>17.2 Common dimension error</h3>
    <pre><code># Suppose the feature tensor is (N, 32, 8, 8)
# Correct flattened size:
32 * 8 * 8  # 2048

self.fc = nn.Linear(2048, 10)</code></pre>

    <p>If the actual tensor has shape <code>(N, 32, 7, 7)</code>, the flattened size is <code>32 × 7 × 7 = 1568</code>, not 2048.</p>
</section>

<section id="practice">
    <h2>18. Week 3 Practice / GA-Style Questions</h2>
    <p>Try each question before opening its answer. These questions cover the concepts in your Week 3 topic list.</p>

    <h3>Part A — Concepts</h3>

    <details class="question">
        <summary>Q1. Why are CNNs generally more suitable than MLPs for image data?</summary>
        <div class="answer">
            CNNs use local connectivity and shared filter weights to learn spatial patterns efficiently. MLPs commonly flatten images and use separate dense connections, which can require many more parameters and do not explicitly build in local pattern detection.
        </div>
    </details>

    <details class="question">
        <summary>Q2. What is the difference between a filter and a feature map?</summary>
        <div class="answer">
            A filter is the kernel of weights applied to an input. A feature map is the output generated by applying that filter across the input.
        </div>
    </details>

    <details class="question">
        <summary>Q3. What happens when the number of output filters changes from 8 to 32?</summary>
        <div class="answer">
            The convolution layer produces 32 output channels instead of 8. The output height and width are determined separately by kernel size, stride, padding, dilation, and input dimensions.
        </div>
    </details>

    <details class="question">
        <summary>Q4. Explain stride and padding.</summary>
        <div class="answer">
            Stride controls how far the filter moves at each step. Padding adds values around the input border. Larger stride generally reduces spatial dimensions; suitable padding can preserve them.
        </div>
    </details>

    <details class="question">
        <summary>Q5. What is a receptive field?</summary>
        <div class="answer">
            It is the region of the original input that can influence a particular output neuron. Stacking layers and using larger strides can increase its size.
        </div>
    </details>

    <details class="question">
        <summary>Q6. Why is data augmentation used?</summary>
        <div class="answer">
            It creates varied training examples through label-preserving transformations. This can improve robustness and reduce overfitting. Transformations must be appropriate for the task.
        </div>
    </details>

    <details class="question">
        <summary>Q7. What is the difference between max pooling and average pooling?</summary>
        <div class="answer">
            Max pooling returns the largest value in each window; average pooling returns the mean. Standard versions have no trainable pooling weights.
        </div>
    </details>

    <h3>Part B — Output dimensions</h3>

    <details class="question">
        <summary>Q8. Input size 28, kernel 3, stride 1, padding 0. What is the output size?</summary>
        <div class="answer">
            Formula: floor((28 + 2×0 − 3) / 1 + 1) = <strong>26</strong>. For a 28 × 28 input, the output is 26 × 26.
        </div>
    </details>

    <details class="question">
        <summary>Q9. Input size 28, kernel 3, stride 1, padding 1. What is the output size?</summary>
        <div class="answer">
            floor((28 + 2×1 − 3) / 1 + 1) = <strong>28</strong>. Height and width are preserved.
        </div>
    </details>

    <details class="question">
        <summary>Q10. Input size 64, kernel 3, stride 2, padding 1. What is the output size?</summary>
        <div class="answer">
            floor((64 + 2×1 − 3) / 2 + 1) = floor(32.5) = <strong>32</strong>.
        </div>
    </details>

    <details class="question">
        <summary>Q11. Input tensor is (8, 3, 32, 32). Apply Conv2d(3, 16, kernel_size=3, stride=1, padding=1). What is the output shape?</summary>
        <div class="answer">
            Batch size remains 8, output channels become 16, and spatial dimensions remain 32 × 32. Answer: <strong>(8, 16, 32, 32)</strong>.
        </div>
    </details>

    <details class="question">
        <summary>Q12. Input tensor is (8, 16, 32, 32). Apply MaxPool2d(2, 2). What is the output shape?</summary>
        <div class="answer">
            Spatial dimensions halve to 16 × 16; batch size and channels stay unchanged. Answer: <strong>(8, 16, 16, 16)</strong>.
        </div>
    </details>

    <details class="question">
        <summary>Q13. A feature tensor has shape (4, 32, 8, 8). What is the flattened shape?</summary>
        <div class="answer">
            Per image: 32 × 8 × 8 = 2048. Answer: <strong>(4, 2048)</strong>.
        </div>
    </details>

    <h3>Part C — Parameter counting</h3>

    <details class="question">
        <summary>Q14. How many parameters are in Conv2d(3, 16, kernel_size=3) with bias enabled?</summary>
        <div class="answer">
            Each filter has 3 × 3 × 3 = 27 weights and 1 bias. There are 16 filters. Total = (27 + 1) × 16 = <strong>448</strong>.
        </div>
    </details>

    <details class="question">
        <summary>Q15. How many parameters are in Conv2d(16, 32, kernel_size=3) with bias enabled?</summary>
        <div class="answer">
            Each filter has 16 × 3 × 3 = 144 weights and 1 bias. Total = (144 + 1) × 32 = <strong>4,640</strong>.
        </div>
    </details>

    <details class="question">
        <summary>Q16. How many parameters are in Linear(2048, 10) with bias?</summary>
        <div class="answer">
            Weights = 2048 × 10 = 20,480. Biases = 10. Total = <strong>20,490</strong>.
        </div>
    </details>

    <details class="question">
        <summary>Q17. Does increasing the input image size change the parameter count of a fixed Conv2d layer?</summary>
        <div class="answer">
            No. For a fixed convolution configuration, parameter count depends on input channels, output channels, kernel dimensions, groups, and whether bias is used. Image height and width affect output size, not the filter parameter count.
        </div>
    </details>

    <h3>Part D — PyTorch and training</h3>

    <details class="question">
        <summary>Q18. Which PyTorch layer performs 2D convolution?</summary>
        <div class="answer">
            <code>torch.nn.Conv2d</code>.
        </div>
    </details>

    <details class="question">
        <summary>Q19. Which PyTorch layers implement max and average pooling?</summary>
        <div class="answer">
            <code>torch.nn.MaxPool2d</code> and <code>torch.nn.AvgPool2d</code>.
        </div>
    </details>

    <details class="question">
        <summary>Q20. Why is the input to Conv2d normally shaped (N, C, H, W)?</summary>
        <div class="answer">
            PyTorch's standard Conv2d interface expects batch size first, then channels, height, and width.
        </div>
    </details>

    <details class="question">
        <summary>Q21. Why call optimizer.zero_grad() before loss.backward()?</summary>
        <div class="answer">
            PyTorch accumulates gradients by default. Clearing old gradients ensures the current batch's gradient is used as intended.
        </div>
    </details>

    <details class="question">
        <summary>Q22. What is the purpose of loss.backward()?</summary>
        <div class="answer">
            It computes gradients of the loss with respect to the relevant tensors and trainable model parameters that participate in the computation graph.
        </div>
    </details>

    <details class="question">
        <summary>Q23. What does optimizer.step() do?</summary>
        <div class="answer">
            It updates the optimizer's parameters using their gradients and the optimizer's update rule.
        </div>
    </details>

    <details class="question">
        <summary>Q24. Why use model.eval() and torch.no_grad() during validation?</summary>
        <div class="answer">
            <code>model.eval()</code> switches layers such as dropout and batch normalization to evaluation behaviour. <code>torch.no_grad()</code> prevents gradient tracking, reducing memory use when gradients are not needed.
        </div>
    </details>

    <details class="question">
        <summary>Q25. What does DataLoader do?</summary>
        <div class="answer">
            It batches examples from a dataset and supports features such as shuffling, multiprocessing, and control over incomplete final batches.
        </div>
    </details>

    <details class="question">
        <summary>Q26. Why should the final Linear layer output the number of classes?</summary>
        <div class="answer">
            For standard single-label multiclass classification, each sample needs one logit per class. For 10 classes, the output shape is generally (N, 10).
        </div>
    </details>

    <h3>Part E — Find the error</h3>

    <details class="question">
        <summary>Q27. Identify the issue: Conv2d(1, 16, 3) receives input shaped (8, 3, 28, 28).</summary>
        <div class="answer">
            The layer expects one input channel but the tensor has three. For RGB data, use <code>nn.Conv2d(3, 16, 3)</code>, or intentionally convert the input to one channel.
        </div>
    </details>

    <details class="question">
        <summary>Q28. A model outputs shape (N, 10). Why can labels shaped (N, 1) cause a problem with CrossEntropyLoss?</summary>
        <div class="answer">
            For ordinary single-label multiclass classification, class-index labels should normally have shape (N,) and dtype <code>torch.long</code>. Convert or reshape labels appropriately after checking their meaning.
        </div>
    </details>

    <details class="question">
        <summary>Q29. A CNN produces (N, 32, 7, 7), but the linear layer expects 2048 features. What is wrong?</summary>
        <div class="answer">
            The actual flattened size is 32 × 7 × 7 = 1568. The linear layer's input size must match the actual flattened feature size, or the architecture must be adjusted.
        </div>
    </details>

    <details class="question">
        <summary>Q30. A model uses softmax followed by CrossEntropyLoss. What is the standard correction?</summary>
        <div class="answer">
            Remove the explicit softmax and pass raw logits directly to <code>nn.CrossEntropyLoss</code>.
        </div>
    </details>

    <h3>Part F — Architecture tracing</h3>

    <details class="question">
        <summary>Q31. Trace the output shape for input (4, 3, 32, 32), Conv2d(3, 8, 3, padding=1), ReLU, MaxPool2d(2), Flatten, Linear(8×16×16, 5).</summary>
        <div class="answer">
            <ol>
                <li>Input: (4, 3, 32, 32)</li>
                <li>Convolution: (4, 8, 32, 32)</li>
                <li>ReLU: (4, 8, 32, 32)</li>
                <li>Max pooling: (4, 8, 16, 16)</li>
                <li>Flatten: (4, 2048)</li>
                <li>Linear: <strong>(4, 5)</strong></li>
            </ol>
        </div>
    </details>

    <details class="question">
        <summary>Q32. How many output feature maps does Conv2d(3, 24, kernel_size=5) produce?</summary>
        <div class="answer">
            It produces <strong>24 output channels</strong>, or 24 feature maps per input sample.
        </div>
    </details>

    <details class="question">
        <summary>Q33. Which transforms are generally suitable for training versus validation?</summary>
        <div class="answer">
            Training may use random, label-preserving augmentation followed by the required tensor conversion and normalization. Validation typically uses deterministic resizing/cropping and the same appropriate normalization, without random augmentation.
        </div>
    </details>
</section>

<section id="revision">
    <h2>19. Rapid Revision Sheet</h2>

    <h3>Core definitions</h3>
    <ul>
        <li><strong>CNN:</strong> neural network using convolutional operations to learn spatial features.</li>
        <li><strong>Kernel/filter:</strong> weights applied to local input regions.</li>
        <li><strong>Feature map:</strong> output produced by a filter.</li>
        <li><strong>Receptive field:</strong> input region that can influence a particular output.</li>
        <li><strong>Stride:</strong> step size as a kernel moves.</li>
        <li><strong>Padding:</strong> values added around an input's border.</li>
        <li><strong>Pooling:</strong> local aggregation, commonly max or average.</li>
        <li><strong>Flatten:</strong> converts features to vectors per sample.</li>
        <li><strong>Data augmentation:</strong> label-preserving transformations that diversify training examples.</li>
        <li><strong>DataLoader:</strong> batches examples and controls iteration over a dataset.</li>
        <li><strong>Logits:</strong> raw class scores produced by a classifier.</li>
    </ul>

    <h3>Essential formulas</h3>
    <div class="formula">
        Conv output = floor((Input + 2P − D(K − 1) − 1) / S + 1)
    </div>
    <div class="formula">
        Conv parameters = (Cᵢ × Kₕ × Kᵥ + 1) × Cₒ
    </div>
    <div class="formula">
        Linear parameters = in_features × out_features + out_features
    </div>
    <div class="formula">
        Flattened features = Channels × Height × Width
    </div>
    <div class="formula">
        Accuracy = Correct predictions / Total predictions
    </div>

    <h3>Common PyTorch layers and operations</h3>
    <table>
        <thead><tr><th>Purpose</th><th>PyTorch API</th></tr></thead>
        <tbody>
            <tr><td>Convolution</td><td><code>nn.Conv2d</code></td></tr>
            <tr><td>ReLU activation</td><td><code>nn.ReLU</code></td></tr>
            <tr><td>Max pooling</td><td><code>nn.MaxPool2d</code></td></tr>
            <tr><td>Average pooling</td><td><code>nn.AvgPool2d</code></td></tr>
            <tr><td>Flattening</td><td><code>nn.Flatten</code> or <code>torch.flatten</code></td></tr>
            <tr><td>Dense layer</td><td><code>nn.Linear</code></td></tr>
            <tr><td>Multiclass loss</td><td><code>nn.CrossEntropyLoss</code></td></tr>
            <tr><td>Optimizer</td><td><code>torch.optim.Adam</code> or <code>torch.optim.SGD</code></td></tr>
            <tr><td>Batching</td><td><code>torch.utils.data.DataLoader</code></td></tr>
            <tr><td>Evaluation mode</td><td><code>model.eval()</code></td></tr>
            <tr><td>Disable gradient tracking</td><td><code>torch.no_grad()</code></td></tr>
        </tbody>
    </table>

    <h3>Typical CNN forward-pass order</h3>
    <div class="diagram">
        Input → Conv → Activation → Pooling → Conv → Activation → Pooling → Flatten → Fully Connected → Logits
    </div>

    <h3>Training loop order</h3>
    <ol>
        <li>Read a batch from the DataLoader.</li>
        <li>Move inputs and labels to the model's device.</li>
        <li>Clear gradients with <code>optimizer.zero_grad()</code>.</li>
        <li>Calculate logits with the forward pass.</li>
        <li>Calculate loss.</li>
        <li>Run <code>loss.backward()</code>.</li>
        <li>Run <code>optimizer.step()</code>.</li>
        <li>Repeat for batches and epochs.</li>
        <li>Evaluate using <code>model.eval()</code> and <code>torch.no_grad()</code>.</li>
    </ol>

    <div class="callout success">
        <strong>Final GA preparation checklist:</strong>
        Make sure you can calculate convolution and pooling output sizes, count convolution parameters, trace tensor shapes, distinguish convolution from pooling, explain CNN advantages over MLPs, identify appropriate augmentation, and recognize the standard PyTorch training loop.
    </div>
</section>

<div class="summary-card">
    <h2>Week 3 Topic Sequence Checklist</h2>
    <ol>
        <li>Introduction to Vision Modelling</li>
        <li>From MLP to Convolution</li>
        <li>Filters, Feature Maps and Receptive Field</li>
        <li>CNN Hyperparameters</li>
        <li>CNN Network Layers</li>
        <li>CNN Architecture and Data Augmentation</li>
        <li>Convolution from Scratch</li>
        <li>Pooling from Scratch</li>
        <li>Convolution in PyTorch</li>
        <li>Pooling in PyTorch</li>
        <li>CNN Image Classification: Simple CNN Implementation</li>
        <li>CNN Image Classification: Data Preprocessing and DataLoaders</li>
        <li>CNN Image Classification: Model Training</li>
        <li>Week 3 Practice Assignment</li>
        <li>Week 3 Graded Assignment</li>
    </ol>

    <p><strong>Assignment placement:</strong> According to the sequence you provided, the Practice Assignment and Graded Assignment appear at the end of Week 3. Your supplied topic list does not include a separate item labelled “Activity Assignment”.</p>

    <h3 id="ga">GA — Week 3 Graded Assignment</h3>
    
    <p>Worked solutions to the questions supplied are below. For the convolution and pooling calculations, assume the usual stride of 1 for convolution and non-overlapping pooling with stride equal to its window size unless stated otherwise.</p>

    <h4>Part A — Convolution and fully connected layers</h4>
    <div class="question">
        <strong>Question 1. Padding and filter size</strong>
        <p>What relation between filter size <code>F₁</code> and padding <code>P</code> keeps the output feature map's width and height equal to the input, assuming stride 1?</p>
        <p><strong>Answer:</strong> <code>P = (F₁ − 1) / 2</code>, equivalently <code>F₁ = 2P + 1</code>.</p>
        <p>With stride 1, the one-dimensional output size is <code>O = I + 2P − F₁ + 1</code>. For the output to equal the input, set <code>O = I</code>: <code>2P − F₁ + 1 = 0</code>. Thus the padding must be half the filter size minus one. This gives integer symmetric padding when <code>F₁</code> is odd (for example, a 3 × 3 filter uses padding 1).</p>
    </div>

    <div class="question">
        <strong>Question 2. Convolution output dimensions</strong>
        <p>An input has size <code>1 × 16 × 16</code> (depth × width × height). A <code>5 × 5</code> filter is applied with zero padding and stride 1. What is the output feature map size, in depth × width × height order?</p>
        <p><strong>Answer:</strong> <code>1 × 12 × 12</code> (depth × width × height).</p>
        <p>With input width and height 16, filter size 5, zero padding, and stride 1: <code>O = floor((16 + 2·0 − 5) / 1) + 1 = 12</code>. The single input channel is the depth here, so the result is 1 × 12 × 12.</p>
    </div>

    <div class="question">
        <strong>Question 3. Multiple filters</strong>
        <p>Using the setup in Question 2, what is the output feature map size when the convolution layer uses four filters?</p>
        <p><strong>Answer:</strong> <code>4 × 12 × 12</code>.</p>
        <p>Each of the four filters produces one feature map. The spatial dimensions stay 12 × 12 because the input, kernel, padding, and stride are unchanged. The number of filters sets output depth to 4.</p>
    </div>

    <div class="question">
        <strong>Question 4. Max pooling</strong>
        <p>Using the output from Question 3, what pooling filter size <code>F₂</code> produces an output of <code>4 × 6 × 6</code>? Assume non-overlapping pooling, so the stride equals the filter size.</p>
        <p><strong>Answer:</strong> <code>F₂ = 2</code>, assuming the pooling stride equals the window size.</p>
        <p>The input to pooling is 4 × 12 × 12. A 2 × 2 max-pooling window with stride 2 halves each spatial dimension: <code>12 / 2 = 6</code>. Pooling does not change the four channels, giving 4 × 6 × 6. If stride were independently specified, the window size alone would not determine this output.</p>
    </div>

    <div class="question">
        <strong>Question 5. Flattening and fully connected layer</strong>
        <p>After max pooling, flatten the output and feed it to a fully connected hidden layer with <code>x</code> neurons. If its weight matrix contains 2,880 parameters, find <code>x</code>.</p>
        <p><strong>Answer:</strong> <code>x = 20</code> neurons.</p>
        <p>Flattening 4 × 6 × 6 produces <code>4 · 6 · 6 = 144</code> input features. A dense weight matrix from 144 inputs to <code>x</code> neurons contains <code>144x</code> weights. Set this equal to 2,880: <code>144x = 2880</code>, so <code>x = 2880 / 144 = 20</code>.</p>
    </div>

    <div class="question">
        <strong>Question 6. Classification head parameters</strong>
        <p>Using the value of <code>x</code> from Question 5, how many weight parameters connect the hidden layer to a classification head with five output neurons? Ignore biases.</p>
        <p><strong>Answer:</strong> <code>100</code> weights, ignoring biases.</p>
        <p>The hidden layer has 20 neurons and the classification head has 5 output neurons. Its weight matrix therefore has <code>20 · 5 = 100</code> parameters.</p>
    </div>

    <h4>Part B — Exponential Moving Average (EMA)</h4>
    <div class="question">
        <strong>Question 7. Running mean after two updates</strong>
        <p>EMA updates follow <code>μrunning,new = (1 − α)μrunning + αμB</code>. Given consecutive batch means <code>μB₁ = 10</code> and <code>μB₂ = 20</code>, and initial running mean <code>μ₀</code>, express the running mean <code>μ₂</code> after both updates in terms of <code>μ₀</code>, <code>μB₁</code>, <code>μB₂</code>, and <code>α</code>.</p>
        <p><strong>Answer:</strong> <code>μ₂ = (1 − α)²μ₀ + α(1 − α)μB₁ + αμB₂</code>.</p>
        <p>Apply the recurrence to the first batch: <code>μ₁ = (1 − α)μ₀ + αμB₁</code>. Apply it again to the second batch: <code>μ₂ = (1 − α)μ₁ + αμB₂</code>. Substituting the first expression gives the answer above. With the supplied batch means, this is <code>μ₂ = (1 − α)²μ₀ + 10α(1 − α) + 20α</code>.</p>
    </div>

    <div class="question">
        <strong>Question 8. Finding the initial running mean</strong>
        <p>Using the batch means and EMA rule from Question 7, find <code>μ₀</code> when <code>α = 0.5</code> and the running mean after two updates is <code>μ₂ = 12.5</code>.</p>
        <p><strong>Answer:</strong> <code>μ₀ = 0</code>.</p>
        <p>For <code>α = 0.5</code>, the two-update formula becomes <code>μ₂ = 0.25μ₀ + 0.25(10) + 0.5(20) = 0.25μ₀ + 12.5</code>. Given <code>μ₂ = 12.5</code>, subtract 12.5 from both sides to get <code>0.25μ₀ = 0</code>, hence <code>μ₀ = 0</code>.</p>
    </div>

    <h4>Part C — PyTorch and neural network operations</h4>
    <div class="question">
        <strong>Question 9. Adaptive max pooling</strong>
        <p>What is the primary purpose of <code>nn.AdaptiveMaxPool2d(1)</code>?</p>
        <p><strong>Answer:</strong> <code>nn.AdaptiveMaxPool2d(1)</code> maps each channel's spatial feature map to a 1 × 1 value by taking its maximum.</p>
        <p>For an input shaped <code>(N, C, H, W)</code>, the output is <code>(N, C, 1, 1)</code>, regardless of the input height and width. It keeps batch size and channel count, and is often used before flattening a CNN classifier.</p>
    </div>

    <div class="question">
        <strong>Question 10. Convolution and max-pooling output</strong>
        <p>Consider this code and determine the resulting tensor shape and relevant output properties:</p>
        <pre><code>x = nn.Conv2d(3, 16, 5)(torch.randn(1, 3, 32, 32))
x = nn.MaxPool2d(2, 2)(x)</code></pre>
        <p><strong>Answer:</strong> The convolution output is <code>(1, 16, 28, 28)</code>; after max pooling it is <code>(1, 16, 14, 14)</code>.</p>
        <p><code>Conv2d(3, 16, 5)</code> uses 16 filters of size 5 × 5, with default stride 1 and no padding. Each spatial dimension becomes <code>(32 − 5) + 1 = 28</code>. A 2 × 2 max-pooling window with stride 2 then halves 28 to 14. The batch dimension remains 1 and channels remain 16. The answer choices were not included in the supplied text; select the option that states this resulting shape (and any equivalent true statements).</p>
    </div>

    <div class="question">
        <strong>Question 11. Cross-entropy loss shape</strong>
        <p>A model returns logits with shape <code>(16, 10)</code>, and the class labels have shape <code>(16,)</code>. What shape does <code>nn.CrossEntropyLoss()</code> return with its default settings?</p>
        <p><strong>Answer:</strong> A scalar, zero-dimensional tensor (shape <code>[]</code>) with the default <code>reduction="mean"</code>.</p>
        <p>The logits have one row per sample and one column per class: <code>(16, 10)</code>. Class-index targets have shape <code>(16,)</code>. <code>nn.CrossEntropyLoss()</code> computes one loss per sample internally, then averages those 16 losses by default, returning one scalar. With <code>reduction="none"</code>, it would instead return shape <code>(16,)</code>.</p>
    </div>
</div>

</article>
</main>

<footer class="site-footer">
    BSDA2001 — Introduction to Deep Learning and Generative AI · Week 3 Study Notes
</footer>
</template>

<script>
import SiteHeader from '../components/SiteHeader.vue';
import CourseSidebar from '../components/CourseSidebar.vue';

export default {
  components: { SiteHeader, CourseSidebar },
};
</script>
