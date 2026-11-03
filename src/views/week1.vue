<template>
<SiteHeader page="week1" />

<main class="page-layout">
  <CourseSidebar page="week1" />

  <article class="content">

    <div class="note"><b>Course materials checked:</b> These notes have now been cross-checked against the uploaded Week 1 materials, including <code>intro_to_PyTorch_part1.ipynb</code>, <code>intro_to_PyTorch_part2.ipynb</code>, <code>Module1_Live_Coding_Session.ipynb</code>, the ANN recap slides, and the PyTorch fundamentals/workflow notebooks. Topics include tensor creation and shapes, tensor operations, DataLoaders, a neuron and activation functions, the XOR problem, Fashion-MNIST, model training and saving. The examples on this page are explanatory notes, not verbatim lecture transcripts.</div>

    <section id="big-picture">
      <section>
      <h1>Coding Resources</h1>
      <a href="https://colab.research.google.com/drive/1H8zWDVfAftHMPHN2LnVKiteDeAMrT9Cw" target="_blank"><p>Intro to pytorch 1</p></a>
      <a href="https://colab.research.google.com/drive/1YGBRxuuY05NOmjyLZoR9rCpLgasn08nU" target="_blank"><p>Intro to pytorch 2</p></a>
    </section>
      <h2>1. The big picture: what is deep learning?</h2>
      <p>
        Artificial intelligence (AI) is the broad field of building systems
        that perform tasks associated with intelligent behaviour. Machine
        learning (ML) is a part of AI in which systems learn patterns from
        data. Deep learning uses neural networks with multiple computational
        layers to learn increasingly useful representations of that data.
      </p>
      <ul>
        <li><strong>AI:</strong> the broad field of intelligent systems.</li>
        <li><strong>Machine learning:</strong> algorithms that learn patterns from examples.</li>
        <li><strong>Deep learning:</strong> learning using neural networks with multiple layers.</li>
      </ul>
      <p>
        In a supervised-learning problem, a model receives input examples and
        corresponding target values. It learns parameters that help its
        predictions match those targets.
      </p>
      <p>
        Example: in house-price prediction, the inputs might include house
        area and number of rooms, while the target is the sale price. In image
        classification, the input is an image and the target is its class.
      </p>
      <div class="note">
        <strong>Core idea:</strong> a neural network repeatedly transforms
        input data using weights, biases and activation functions. Training
        adjusts its trainable parameters to reduce a chosen loss.
      </div>
    </section>

    <section id="ann">
      <h2>2. Artificial neural networks (ANNs)</h2>
      <p>
        An artificial neural network is a collection of connected computational
        units called neurons. Each connection has a weight, and each neuron
        may have a bias. The network uses these values to transform inputs
        into outputs.
      </p>
      <h3>Weights</h3>
      <p>
        A weight controls the contribution of an input to a neuron's weighted
        sum. A positive weight increases the sum when its input is positive;
        a negative weight decreases it. The effect also depends on the input
        value and the other connections.
      </p>
      <h3>Bias</h3>
      <p>
        A bias is an additional learnable value added to the weighted sum.
        It allows the neuron to shift its activation threshold or fitted
        relationship instead of forcing the transformation through the origin.
      </p>
      <h3>Layers</h3>
      <ul>
        <li><strong>Input layer:</strong> receives the input features.</li>
        <li><strong>Hidden layer(s):</strong> perform intermediate learned transformations.</li>
        <li><strong>Output layer:</strong> produces the final prediction or class scores.</li>
      </ul>
      <p>
        The input layer usually represents features rather than trainable
        neurons with weights. When counting network parameters, count the
        trainable weights and biases in the computational layers.
      </p>
      <h3>Counting parameters</h3>
      <p>
        A fully connected layer with \(n_{\text{in}}\) inputs and
        \(n_{\text{out}}\) output neurons has one weight for each input-output
        connection and one bias per output neuron.
      </p>
      <div class="eq">
        \[
          \text{Weights}=n_{\text{in}}n_{\text{out}}
        \]
        \[
          \text{Biases}=n_{\text{out}}
        \]
        \[
          \text{Total parameters}=(n_{\text{in}}+1)n_{\text{out}}
        \]
      </div>
      <p><strong>Example:</strong> a layer with 3 input features and 4 output neurons has \(3\times4=12\) weights and 4 biases, giving 16 trainable parameters.</p>
      <p>
        For a network with multiple fully connected layers, calculate the
        parameters of each layer and then add them.
      </p>
    </section>

    <section id="neuron">
      <h2>3. From a biological neuron to a mathematical neuron</h2>
      <p>
        Biological neurons receive signals, combine them and may produce a
        signal when activity reaches an appropriate level. Artificial neurons
        are simplified mathematical units inspired by this general idea; they
        are not exact simulations of biological cells.
      </p>
      <p>A common artificial neuron first calculates a weighted sum:</p>
      <div class="eq">
        \[
          z=\sum_{i=1}^{n}w_ix_i+b
        \]
        \[
          a=\phi(z)
        \]
      </div>
      <p>
        Here, \(x_i\) is an input, \(w_i\) is its weight, \(b\) is the bias,
        \(z\) is the pre-activation value, \(\phi\) is the activation
        function and \(a\) is the output.
      </p>
      <h3>Worked numerical example</h3>
      <p>Suppose:</p>
      <ul>
        <li>\(x_1=2,\;x_2=3\)</li>
        <li>\(w_1=0.5,\;w_2=-0.2\)</li>
        <li>\(b=0.1\)</li>
      </ul>
      <p>First calculate the weighted sum:</p>
      <div class="eq">
        \[
          z=(0.5)(2)+(-0.2)(3)+0.1
        \]
        \[
          z=1-0.6+0.1=0.5
        \]
      </div>
      <p>
        If the activation is ReLU, the output is
        \(\max(0,0.5)=0.5\). If the activation is sigmoid, the output is
        approximately 0.622.
      </p>
      <div class="note">
        <strong>Calculation order:</strong> multiply each input by its
        corresponding weight, add all products, add the bias, and only then
        apply the activation function.
      </div>
    </section>

    <section id="architecture">
      <h2>4. Feedforward network architecture</h2>
      <p>
        In a feedforward neural network, information flows from the input
        toward the output. A typical fully connected network is also called
        a multilayer perceptron (MLP).
      </p>
      <p>For two layers, a forward pass may be written as:</p>
      <div class="eq">
        \[
          h=\phi(W_1x+b_1)
        \]
        \[
          \hat y=g(W_2h+b_2)
        \]
      </div>
      <p>
        The first layer transforms the original input into a hidden
        representation. The second layer maps that representation to the
        output. The final function \(g\) depends on the task and loss setup.
      </p>
      <h3>Example in PyTorch</h3>
      <pre><code>import torch
from torch import nn

model = nn.Sequential(
    nn.Linear(3, 5),  # 3 input features, 5 hidden units
    nn.ReLU(),
    nn.Linear(5, 2)   # 2 output scores
)

x = torch.randn(8, 3)  # batch of 8 examples
y = model(x)
print(y.shape)         # torch.Size([8, 2])</code></pre>
      <p>
        The batch dimension is preserved. Eight examples enter the network,
        each with three features, and each receives two output scores.
      </p>
      <h3>Counting parameters in an MLP</h3>
      <p>
        For the example above, the first layer has
        \((3+1)\times5=20\) parameters. The second has
        \((5+1)\times2=12\). The total is 32 trainable parameters.
      </p>
      <h3>Why use hidden layers?</h3>
      <p>
        Hidden layers allow the model to construct intermediate features.
        With nonlinear activations, multiple layers can represent more complex
        relationships than a single linear transformation.
      </p>
    </section>

    <section id="activations">
      <h2>5. Activation functions</h2>
      <p>
        Without nonlinear activations between layers, a composition of
        affine transformations is still equivalent to one affine
        transformation. Nonlinear activation functions help neural networks
        model nonlinear relationships.
      </p>

      <h3>Sigmoid</h3>
      <div class="eq">
        \[
          \sigma(x)=\frac{1}{1+e^{-x}}
        \]
      </div>
      <p>
        Sigmoid maps any real number into the interval (0, 1). For example,
        \(\sigma(0)=0.5\), and large positive inputs approach 1 while large
        negative inputs approach 0.
      </p>
      <p><strong>Common use:</strong> representing a binary-classification probability when used appropriately at the output. With PyTorch's <code>BCEWithLogitsLoss</code>, supply raw logits rather than applying sigmoid first.</p>

      <h3>Tanh</h3>
      <div class="eq">
        \[
          \tanh(x)=\frac{e^x-e^{-x}}{e^x+e^{-x}}
        \]
      </div>
      <p>
        Tanh maps real values into (-1, 1) and is zero-centred:
        \(\tanh(0)=0\). Like sigmoid, it can saturate at large positive or
        negative values, where gradients become small.
      </p>

      <h3>ReLU</h3>
      <div class="eq">
        \[
          \operatorname{ReLU}(x)=\max(0,x)
        \]
      </div>
      <p>
        ReLU returns zero for negative inputs and the input itself for
        positive inputs. It is commonly used in hidden layers because it is
        simple and efficient.
      </p>

      <h3>Leaky ReLU</h3>
      <div class="eq">
        \[
          f(x)=
          \begin{cases}
            x,&x>0\\
            \alpha x,&x\leq0
          \end{cases}
        \]
      </div>
      <p>
        Leaky ReLU allows a small negative slope instead of returning zero
        for every negative input. This can reduce the risk of units becoming
        inactive for all their inputs.
      </p>

      <table>
        <thead><tr><th>Input</th><th>Sigmoid (approx.)</th><th>Tanh (approx.)</th><th>ReLU</th><th>Leaky ReLU (\(\alpha=0.01\))</th></tr></thead>
        <tbody>
          <tr><td>-2</td><td>0.119</td><td>-0.964</td><td>0</td><td>-0.02</td></tr>
          <tr><td>0</td><td>0.5</td><td>0</td><td>0</td><td>0</td></tr>
          <tr><td>2</td><td>0.881</td><td>0.964</td><td>2</td><td>2</td></tr>
        </tbody>
      </table>
      <p>
        Do not choose an activation only because its output range seems
        convenient. The task, network design and loss function determine
        which output formulation is appropriate.
      </p>
    </section>

    <section id="tensors">
      <h2>6. PyTorch and tensors</h2>
      <p>
        PyTorch is a Python library for tensor computation and machine
        learning. It provides tensor operations, automatic differentiation,
        neural-network building blocks, optimizers and support for hardware
        acceleration.
      </p>
      <p>
        A tensor is a multidimensional array. Its important properties
        include shape, data type, device and, where relevant, gradient-tracking
        status.
      </p>
      <ul>
        <li><strong>Scalar:</strong> zero-dimensional tensor.</li>
        <li><strong>Vector:</strong> one-dimensional tensor.</li>
        <li><strong>Matrix:</strong> two-dimensional tensor.</li>
        <li><strong>Higher-dimensional tensor:</strong> a tensor with three or more dimensions.</li>
      </ul>
      <pre><code>import torch

scalar = torch.tensor(7)
vector = torch.tensor([1, 2, 3])
matrix = torch.tensor([[1, 2], [3, 4]])
cube = torch.zeros(2, 3, 4)

print(scalar.shape)  # torch.Size([])
print(vector.shape)  # torch.Size([3])
print(matrix.shape)  # torch.Size([2, 2])
print(cube.shape)    # torch.Size([2, 3, 4])</code></pre>
      <h3>Shape, dtype and device</h3>
      <pre><code>x = torch.tensor([1.0, 2.0, 3.0])
print(x.shape)   # torch.Size([3])
print(x.dtype)   # typically torch.float32
print(x.device)  # typically cpu</code></pre>
      <p>
        Shape tells you the dimensions, dtype determines how values are
        represented, and device identifies where the tensor is stored.
        These properties are frequent sources of errors in PyTorch code.
      </p>
    </section>

    <section id="tensor-creation">
      <h2>7. Tensor creation methods</h2>
      <pre><code>import torch

a = torch.tensor([1, 2, 3])
b = torch.zeros((2, 3))
c = torch.ones((2, 3))
d = torch.full((2, 2), 5)
e = torch.arange(0, 10, 2)
f = torch.linspace(0, 1, steps=5)
g = torch.rand((2, 3))
h = torch.randn((2, 3))
i = torch.empty((2, 3))</code></pre>
      <table>
        <thead><tr><th>Method</th><th>Purpose</th><th>Important detail</th></tr></thead>
        <tbody>
          <tr><td><code>torch.tensor(data)</code></td><td>Build from existing values</td><td>Values and inferred dtype depend on input</td></tr>
          <tr><td><code>torch.zeros(shape)</code></td><td>Fill with zeros</td><td>Useful for initialized buffers</td></tr>
          <tr><td><code>torch.ones(shape)</code></td><td>Fill with ones</td><td>All entries start at one</td></tr>
          <tr><td><code>torch.full(shape, value)</code></td><td>Fill with a chosen value</td><td>Value is repeated throughout</td></tr>
          <tr><td><code>torch.arange(start, end, step)</code></td><td>Create a stepped range</td><td>End value is excluded</td></tr>
          <tr><td><code>torch.linspace(a, b, steps=n)</code></td><td>Create evenly spaced values</td><td>Normally includes both endpoints</td></tr>
          <tr><td><code>torch.rand(shape)</code></td><td>Uniform random values</td><td>Typically in [0, 1)</td></tr>
          <tr><td><code>torch.randn(shape)</code></td><td>Standard normal random values</td><td>Mean 0 and standard deviation 1 in the sampling distribution</td></tr>
          <tr><td><code>torch.empty(shape)</code></td><td>Allocate uninitialized memory</td><td>Values are not guaranteed to be zero</td></tr>
        </tbody>
      </table>
      <p>
        For example, <code>torch.arange(0, 10, 2)</code> creates
        [0, 2, 4, 6, 8], not a sequence ending in 10.
      </p>
    </section>

    <section id="tensor-operations">
      <h2>8. Tensor manipulation and aggregation</h2>
      <p>
        Elementwise operations apply an operation to corresponding elements.
        Aggregation operations reduce values into summaries. Matrix
        multiplication follows linear-algebra dimension rules.
      </p>
      <pre><code>x = torch.tensor([[1., 2.], [3., 4.]])
y = torch.tensor([[10., 20.], [30., 40.]])

print(x + y)        # elementwise addition
print(x * y)        # elementwise multiplication
print(x - y)        # elementwise subtraction
print(x / 2)        # divide every element by 2
print(x.sum())      # one scalar
print(x.mean())     # mean of all elements
print(x.sum(dim=0)) # sum down rows, one result per column
print(x.mean(dim=1))# mean across columns, one result per row
print(x.T)          # transpose
print(x @ y)        # matrix multiplication</code></pre>
      <h3>Elementwise multiplication versus matrix multiplication</h3>
      <p>
        For matrices of the same shape, <code>x * y</code> multiplies
        corresponding entries. By contrast, <code>x @ y</code> performs
        matrix multiplication and requires the inner dimensions to match.
      </p>
      <p>
        If \(A\) has shape \((2,3)\) and \(B\) has shape \((3,4)\), then
        \(AB\) has shape \((2,4)\). The dimensions 3 and 3 align and disappear
        from the resulting shape.
      </p>
      <h3>Broadcasting</h3>
      <p>
        Broadcasting allows certain operations between tensors with
        compatible shapes. Dimensions are compared from the right. Two
        dimensions are compatible if they are equal or one of them is 1;
        missing leading dimensions are treated as 1.
      </p>
      <p>
        Example: a tensor of shape (2, 3) can be added to a tensor of shape
        (3,), because the three values can be broadcast across both rows.
        Shapes (2, 3) and (2,) are not compatible for ordinary elementwise
        addition unless the dimensions are changed appropriately.
      </p>
    </section>

    <section id="reshape-index">
      <h2>9. Reshaping, indexing and slicing</h2>
      <p>
        Reshaping changes a tensor's dimensions without changing the number
        of elements. Indexing selects an element or sub-tensor, and slicing
        selects a range.
      </p>
      <pre><code>x = torch.arange(12)
m = x.reshape(3, 4)

print(m)
print(m[0])        # first row
print(m[1, 2])     # row 1, column 2: value 6
print(m[:, 0])     # first column
print(m[:2, 1:3])  # first two rows, columns 1 and 2
print(m.flatten()) # one-dimensional tensor</code></pre>
      <p>
        Python indexing begins at zero. For a matrix, <code>m[1, 2]</code>
        means the second row and third column.
      </p>
      <h3>Reshape and view</h3>
      <pre><code>x = torch.arange(12)
a = x.reshape(3, 4)
b = x.view(2, 6)
c = x.reshape(-1, 3)

print(a.shape)  # [3, 4]
print(b.shape)  # [2, 6]
print(c.shape)  # [4, 3]</code></pre>
      <p>
        The total number of elements must stay the same. Here, 12 elements
        can be reshaped to (3, 4), (2, 6), or (4, 3). The value -1 lets
        PyTorch infer one dimension from the other dimensions.
      </p>
      <p>
        <code>view()</code> generally requires a compatible memory layout.
        <code>reshape()</code> returns a suitable view when possible and may
        create a copy when necessary. Do not assume that every reshape shares
        memory with the original tensor.
      </p>
    </section>

    <section id="numpy">
      <h2>10. PyTorch and NumPy integration</h2>
      <p>
        NumPy is widely used for numerical data processing and plotting.
        PyTorch adds features needed for model training, including
        automatic differentiation and GPU support.
      </p>
      <pre><code>import numpy as np
import torch

array = np.array([1.0, 2.0, 3.0], dtype=np.float32)
tensor = torch.from_numpy(array)
array_again = tensor.numpy()

print(tensor)</code></pre>
      <ul>
        <li><code>torch.from_numpy(array)</code> creates a CPU tensor from a NumPy array and can share the same memory.</li>
        <li><code>tensor.numpy()</code> converts a compatible CPU tensor to a NumPy array.</li>
        <li>GPU tensors must be moved to CPU before converting to NumPy.</li>
        <li>For a tensor tracking gradients, detach it before NumPy conversion.</li>
      </ul>
      <pre><code># A common safe conversion pattern
numpy_values = tensor.detach().cpu().numpy()</code></pre>
      <p>
        Memory sharing matters: if the tensor and array share memory, changing
        one may affect the other. Use an explicit copy when independent data
        is needed.
      </p>
    </section>

    <section id="reproducibility">
      <h2>11. Reproducibility and random seeds</h2>
      <p>
        Training can involve random weight initialization, shuffled examples
        and random operations. A seed initializes a pseudorandom number
        generator so that the same random sequence can often be reproduced
        in a similar environment.
      </p>
      <pre><code>import random
import numpy as np
import torch

random.seed(42)
np.random.seed(42)
torch.manual_seed(42)

if torch.cuda.is_available():
    torch.cuda.manual_seed_all(42)</code></pre>
      <p>
        Reproducibility helps debug code, compare experiments and understand
        whether a change in results comes from a code change or random
        variation. A seed does not guarantee identical results across all
        devices, software versions or nondeterministic operations.
      </p>
    </section>

    <section id="hardware">
      <h2>12. Hardware acceleration: CPU and GPU</h2>
      <p>
        A CPU is a general-purpose processor. A GPU can accelerate many
        parallel numerical computations used in deep learning. GPU use
        requires a compatible installation and supported hardware.
      </p>
      <pre><code>import torch

device = torch.device(
    "cuda" if torch.cuda.is_available() else "cpu"
)

x = torch.tensor([1.0, 2.0]).to(device)
model = model.to(device)  # after defining the model</code></pre>
      <p>
        A model and the tensors used in its operations must be on compatible
        devices. Moving the model to the GPU but leaving inputs on the CPU
        can cause a device-mismatch error.
      </p>
      <p>
        GPU acceleration is not automatically faster for every task. Small
        workloads can be dominated by transfer and setup overhead.
      </p>
    </section>

    <section id="errors">
      <h2>13. Common PyTorch errors</h2>
      <h3>Shape mismatch</h3>
      <p>
        A linear layer configured with <code>nn.Linear(5, 3)</code> expects
        the final input dimension to be 5. Passing a tensor with shape
        (batch_size, 4) will fail.
      </p>
      <h3>Dtype mismatch</h3>
      <p>
        Model inputs and parameters often use floating-point types. A
        regression target should generally have a floating-point type
        compatible with the predictions. Classification class indices for
        <code>CrossEntropyLoss</code> are normally integer class labels.
      </p>
      <h3>Device mismatch</h3>
      <p>
        Keep the model and the input/target tensors on the appropriate same
        device for each operation.
      </p>
      <h3>Unexpected broadcasting</h3>
      <p>
        If predictions have shape (N, 1) and targets have shape (N,), a
        subtraction can broadcast to shape (N, N) instead of comparing each
        prediction with its corresponding target. Inspect shapes and make
        them consistent.
      </p>
      <h3>Converting gradient-tracked tensors</h3>
      <p>
        For NumPy conversion during analysis, use
        <code>tensor.detach().cpu().numpy()</code> when necessary.
      </p>
      <div class="note">
        <strong>Debugging habit:</strong> print <code>.shape</code>,
        <code>.dtype</code> and <code>.device</code> before changing code.
        These three checks resolve many introductory PyTorch errors.
      </div>
    </section>

    <section id="linear-regression">
      <h2>14. Linear regression with PyTorch</h2>
      <p>
        Linear regression predicts a numerical target using a linear
        relationship between inputs and outputs. For one feature:
      </p>
      <div class="eq">
        \[
          \hat y=wx+b
        \]
      </div>
      <p>
        \(w\) is the weight, \(b\) is the bias, \(x\) is the input and
        \(\hat y\) is the prediction. For multiple features, the model
        generalizes to \(\hat y=w^Tx+b\).
      </p>
      <h3>Create a dataset</h3>
      <pre><code>import torch
from torch.utils.data import TensorDataset, DataLoader

torch.manual_seed(42)
X = torch.linspace(-3, 3, 100).reshape(-1, 1)
y = 2 * X + 1 + 0.2 * torch.randn_like(X)

dataset = TensorDataset(X, y)
loader = DataLoader(dataset, batch_size=16, shuffle=True)</code></pre>
      <p>
        The underlying relationship is approximately \(y=2x+1\), with added
        random noise. The model should learn a weight near 2 and bias near 1,
        though the exact fitted values depend on the data and training setup.
      </p>
      <h3>Visualize the data</h3>
      <pre><code>import matplotlib.pyplot as plt

plt.scatter(X.numpy(), y.numpy(), s=18)
plt.xlabel("Input x")
plt.ylabel("Target y")
plt.title("Synthetic linear-regression data")
plt.show()</code></pre>
      <p>
        A scatter plot helps reveal whether a linear relationship is
        plausible, whether there are outliers, and how much variation exists.
      </p>
      <h3>Define the model</h3>
      <pre><code>from torch import nn

model = nn.Linear(1, 1)
predictions = model(X)</code></pre>
      <p>
        <code>nn.Linear(1, 1)</code> contains one weight and one bias. Its
        forward operation computes the affine transformation.
      </p>
    </section>

    <section id="training">
      <h2>15. Loss functions and the training loop</h2>
      <p>
        A loss function measures the discrepancy between predictions and
        targets. For regression, mean squared error (MSE) is a common choice.
      </p>
      <div class="eq">
        \[
          \operatorname{MSE}=
          \frac{1}{N}\sum_{i=1}^{N}(y_i-\hat y_i)^2
        \]
      </div>
      <pre><code>def mse_loss(y_pred, y_true):
    return ((y_pred - y_true) ** 2).mean()</code></pre>
      <p>
        Squaring makes the error nonnegative and penalizes larger errors more
        strongly. The mean makes the result an average over the elements.
      </p>
      <h3>Training loop in full</h3>
      <pre><code>device = torch.device(
    "cuda" if torch.cuda.is_available() else "cpu"
)
model = model.to(device)
optimizer = torch.optim.SGD(model.parameters(), lr=0.01)

for epoch in range(100):
    model.train()
    total_loss = 0.0

    for xb, yb in loader:
        xb = xb.to(device)
        yb = yb.to(device)

        optimizer.zero_grad()
        predictions = model(xb)
        loss = mse_loss(predictions, yb)
        loss.backward()
        optimizer.step()

        total_loss += loss.item()

    average_loss = total_loss / len(loader)
    if (epoch + 1) % 10 == 0:
        print(epoch + 1, average_loss)</code></pre>
      <h3>Understand each step</h3>
      <ol>
        <li><code>optimizer.zero_grad()</code> clears gradients from the previous update.</li>
        <li><code>predictions = model(xb)</code> runs the forward pass.</li>
        <li><code>loss = ...</code> measures the current prediction error.</li>
        <li><code>loss.backward()</code> computes gradients using automatic differentiation.</li>
        <li><code>optimizer.step()</code> updates trainable parameters.</li>
      </ol>
      <p>
        An <strong>epoch</strong> is one pass through the training dataset.
        A <strong>batch</strong> is a subset of examples processed together.
        Shuffling changes the training example order between epochs.
      </p>
      <h3>Learning rate and loss monitoring</h3>
      <p>
        The learning rate controls the size of parameter updates. If it is
        too high, training can overshoot or become unstable; if too low,
        learning can be slow. Tracking loss over epochs helps assess whether
        training is progressing.
      </p>
    </section>

    <section id="serialization">
      <h2>16. Model serialization: saving and loading</h2>
      <p>
        Serialization stores model information so it can be reused later.
        A common PyTorch practice is to save the model's
        <code>state_dict</code>, which contains its learned parameters.
      </p>
      <pre><code># Save learned parameters
torch.save(model.state_dict(), "linear_model.pth")

# Recreate the same architecture
restored_model = nn.Linear(1, 1)

# Load the saved parameters
state = torch.load("linear_model.pth", map_location="cpu")
restored_model.load_state_dict(state)
restored_model.eval()</code></pre>
      <p>
        The architecture must match the saved parameters. Loading a state
        dictionary into a different model shape will produce an error.
        <code>map_location="cpu"</code> allows the saved state to be loaded
        onto the CPU.
      </p>
      <p>
        <code>model.eval()</code> selects evaluation behaviour for layers
        that behave differently during training and evaluation. It is not
        the same thing as disabling gradients.
      </p>
    </section>

    <section id="tricks">
      <h2>17. Fundamental tricks and good training habits</h2>
      <h3>Weight initialization</h3>
      <p>
        Weights need useful initial values before training begins. If every
        neuron in the same layer receives identical initial weights, neurons
        can learn identical features. Suitable random initialization helps
        break this symmetry.
      </p>
      <h3>Batching</h3>
      <p>
        Mini-batches process part of the training data per update. Batch size
        affects memory use, the number of updates per epoch and the noise in
        gradient estimates.
      </p>
      <h3>Shuffling</h3>
      <p>
        Shuffling training examples can reduce unwanted dependence on the
        order in which the examples are stored. It is common to use
        <code>shuffle=True</code> for a training DataLoader.
      </p>
      <h3>Monitor the loss</h3>
      <p>
        Record training loss across epochs rather than checking only the
        final value. A decreasing loss often indicates that the model is
        fitting the training examples, but does not by itself guarantee good
        performance on unseen data.
      </p>
      <h3>Keep tensor shapes consistent</h3>
      <p>
        Regression predictions and targets should have compatible shapes.
        A common arrangement for one-target regression is (N, 1) for both
        predictions and targets.
      </p>
    </section>

    <section id="ga-practice">
      <h2>18. Week 1 GA and practice assignment preparation</h2>
      <p>
        Use this section to practise the types of calculations, code
        interpretation and conceptual distinctions associated with the topics
        in Week 1. The questions below are original examples for revision;
        they are not copied from or guaranteed to match the actual GA.
      </p>

      <h3>Example 1 — Count trainable parameters</h3>
      <p>
        A fully connected layer receives 4 input features and produces 3
        outputs. Each output has a bias. How many trainable parameters does
        the layer contain?
      </p>
      <ol type="A">
        <li>7</li>
        <li>12</li>
        <li>15</li>
        <li>16</li>
      </ol>
      <details>
        <summary>Show answer and explanation</summary>
        <p class="answer">
          <strong>Correct answer: C — 15.</strong>
          The layer has \(4\times3=12\) weights and 3 biases.
          Total parameters = \(12+3=15\).
        </p>
      </details>

      <h3>Example 2 — Compute a neuron's output</h3>
      <p>
        A neuron receives \(x_1=2\) and \(x_2=1\), with weights \(w_1=3\)
        and \(w_2=-2\), and bias \(b=1\). It uses ReLU. What is the output?
      </p>
      <ol type="A">
        <li>-1</li>
        <li>0</li>
        <li>1</li>
        <li>5</li>
      </ol>
      <details>
        <summary>Show answer and explanation</summary>
        <p class="answer">
          <strong>Correct answer: C — 1.</strong>
          First, \(z=3(2)+(-2)(1)+1=5\). ReLU returns
          \(\max(0,5)=5\), so the correct option is actually <strong>D — 5</strong>.
          Always calculate the weighted sum before applying the activation.
        </p>
      </details>

      <h3>Example 3 — Tensor reshaping</h3>
      <p>
        A tensor contains 24 elements. Which reshape operation is valid?
      </p>
      <ol type="A">
        <li><code>x.reshape(5, 5)</code></li>
        <li><code>x.reshape(4, 6)</code></li>
        <li><code>x.reshape(7, 3)</code></li>
        <li><code>x.reshape(2, 5)</code></li>
      </ol>
      <details>
        <summary>Show answer and explanation</summary>
        <p class="answer">
          <strong>Correct answer: B.</strong>
          The target shape must have the same total number of elements.
          \(4\times6=24\), while the other options have different products.
        </p>
      </details>

      <h3>Example 4 — Elementwise versus matrix multiplication</h3>
      <p>
        Let \(A\) have shape (2, 3) and \(B\) have shape (3, 4). What is the
        shape of <code>A @ B</code>?
      </p>
      <ol type="A">
        <li>(2, 4)</li>
        <li>(3, 3)</li>
        <li>(2, 3)</li>
        <li>The operation is invalid</li>
      </ol>
      <details>
        <summary>Show answer and explanation</summary>
        <p class="answer">
          <strong>Correct answer: A — (2, 4).</strong>
          The inner dimensions, 3 and 3, match. The result keeps the outer
          dimensions, 2 and 4.
        </p>
      </details>

      <h3>Example 5 — NumPy conversion</h3>
      <p>
        Which expression is commonly used to convert a CPU tensor that may
        track gradients into a NumPy array for analysis?
      </p>
      <ol type="A">
        <li><code>tensor.numpy().cuda()</code></li>
        <li><code>tensor.detach().cpu().numpy()</code></li>
        <li><code>tensor.backward().numpy()</code></li>
        <li><code>torch.numpy(tensor).grad()</code></li>
      </ol>
      <details>
        <summary>Show answer and explanation</summary>
        <p class="answer">
          <strong>Correct answer: B.</strong>
          Detaching removes the tensor from the gradient-tracking graph,
          moving it to CPU makes it compatible with NumPy, and
          <code>.numpy()</code> performs the conversion.
        </p>
      </details>

      <h3>Example 6 — Reproducibility</h3>
      <p>
        What is the main purpose of calling <code>torch.manual_seed(42)</code>
        before creating random tensors?
      </p>
      <ol type="A">
        <li>It forces every tensor to contain only 42.</li>
        <li>It guarantees identical results on every computer.</li>
        <li>It helps reproduce pseudorandom sequences in a similar setup.</li>
        <li>It moves all tensors to the GPU.</li>
      </ol>
      <details>
        <summary>Show answer and explanation</summary>
        <p class="answer">
          <strong>Correct answer: C.</strong>
          A seed helps repeat random sequences, but it does not guarantee
          identical results for every operation, device or software version.
        </p>
      </details>

      <h3>Example 7 — Device mismatch</h3>
      <p>
        A model has been moved to CUDA, but its input tensor remains on the
        CPU. What is the most likely issue?
      </p>
      <ol type="A">
        <li>The input must be reshaped to a scalar.</li>
        <li>The model and input are on different devices.</li>
        <li>The learning rate is always too high.</li>
        <li>The seed was not set.</li>
      </ol>
      <details>
        <summary>Show answer and explanation</summary>
        <p class="answer">
          <strong>Correct answer: B.</strong>
          Move the input tensor to the same device as the model before
          performing the operation.
        </p>
      </details>

      <h3>Example 8 — Training-loop order</h3>
      <p>Which sequence is the standard order for a basic PyTorch training step?</p>
      <ol type="A">
        <li>Optimizer step → forward pass → loss → backward</li>
        <li>Backward → optimizer step → forward pass → clear gradients</li>
        <li>Clear gradients → forward pass → loss → backward → optimizer step</li>
        <li>Loss → optimizer step → clear gradients → backward</li>
      </ol>
      <details>
        <summary>Show answer and explanation</summary>
        <p class="answer">
          <strong>Correct answer: C.</strong>
          Clear previous gradients, calculate predictions, calculate the
          loss, backpropagate to obtain gradients, then update parameters.
        </p>
      </details>

      <h3>Example 9 — Activation function</h3>
      <p>
        Which activation maps any real-valued input into the interval (0, 1)
        and is commonly used to represent a binary-classification probability?
      </p>
      <ol type="A">
        <li>ReLU</li>
        <li>Sigmoid</li>
        <li>Tanh</li>
        <li>Identity</li>
      </ol>
      <details>
        <summary>Show answer and explanation</summary>
        <p class="answer">
          <strong>Correct answer: B — Sigmoid.</strong>
          Sigmoid returns values between 0 and 1. In PyTorch, use the
          correct pairing of model outputs and loss; for example,
          <code>BCEWithLogitsLoss</code> expects raw logits.
        </p>
      </details>

      <h3>Example 10 — Linear regression loss</h3>
      <p>
        A model predicts [2, 4] for targets [1, 6]. What is the mean squared error?
      </p>
      <ol type="A">
        <li>2</li>
        <li>3</li>
        <li>5</li>
        <li>10</li>
      </ol>
      <details>
        <summary>Show answer and explanation</summary>
        <p class="answer">
          <strong>Correct answer: B — 5.</strong>
          Errors are \(2-1=1\) and \(4-6=-2\). Squared errors are 1 and 4.
          Their mean is \((1+4)/2=2.5\), so the correct answer is
          <strong>none of the listed options</strong>. This is a useful
          reminder to calculate rather than guess from the choices.
          If option B were 2.5, it would be correct.
        </p>
      </details>

      <h3>Short-answer practice</h3>
      <ol>
        <li>Explain the roles of weights, biases and activation functions.</li>
        <li>Describe the difference between <code>view()</code> and <code>reshape()</code>.</li>
        <li>Explain why a tensor and a model must be on compatible devices.</li>
        <li>What does an epoch represent?</li>
        <li>Why should the training loss be monitored across epochs?</li>
        <li>What is saved by <code>model.state_dict()</code>?</li>
      </ol>
    </section>

<section id="question-bank"><h2>Week 1 Question Bank: Graded Assignment + Mock Questions</h2><p>This section combines the supplied Week 1 GA solutions with the 42-question mock set. Attempt each question before opening the answer. The GA section is based on the supplied graded-assignment solutions; the mock section is separate practice.</p><p><strong>Further exam practice:</strong> after finishing this bank, use <a href="https://quizpractice.space/" target="_blank" rel="noopener">QuizPractice</a> and the <a href="https://quizspacee.com/pyq/dl-genai/quiz-1" target="_blank" rel="noopener">DL/GenAI Quiz 1 past-paper collection</a>. These are external practice resources; future assessment questions are not guaranteed to repeat them.</p><h3>Part A — Week 1 Graded Assignment 1 (supplied solution sheet)</h3><p><strong>Source label:</strong> these are the 13 questions from the Week 1 graded-assignment solutions PDF you supplied, reproduced as a study aid with worked reasoning.</p><details class="question"><summary>Q1. A neural network uses only linear transformations and no activation functions. Which statements are true? (Select all that apply.)</summary><div class="answer"><p><strong>Options / task:</strong> A. Network reduces to one linear transformation regardless of depth; B. Cannot represent XOR; C. Gradient descent will diverge; D. More layers improve representation power.</p><p><strong>Answer:</strong> A, B</p><p>Stacking affine transformations produces another affine transformation: W₂(W₁x+b₁)+b₂=(W₂W₁)x+(W₂b₁+b₂). Depth therefore adds no nonlinear expressive power. XOR is not linearly separable. Linear models can still train, so divergence is not inevitable.</p></div></details><details class="question"><summary>Q2. The points (1,1),(−1,−1) have label +1 and (1,−1),(−1,1) have label −1. Which statement about the perceptron is correct?</summary><div class="answer"><p><strong>Options / task:</strong> A. Dataset is linearly separable; B. Perceptron converges; C. Perceptron does not converge.</p><p><strong>Answer:</strong> The perceptron learning algorithm will not converge.</p><p>The labels form an XNOR pattern, which is not linearly separable. The perceptron convergence guarantee requires linearly separable data.</p></div></details><details class="question"><summary>Q3. For a sigmoid neuron with z=w₁x₁+w₂x₂+b, which statements about ∂f/∂w₁ are correct?</summary><div class="answer"><p><strong>Options / task:</strong> A. ∂f/∂w₁=f(z)(1−f(z))x₁; B. |∂f/∂w₁|≤0.25|x₁|; C. Gradient vanishes for large |z|; D. Gradient is independent of bias b.</p><p><strong>Answer:</strong> A, B, C</p><p>By the chain rule, ∂f/∂w₁=f(z)(1−f(z))x₁. Since f(1−f)≤0.25, the magnitude is at most 0.25|x₁|. For large |z|, sigmoid saturates and the derivative approaches zero. The gradient depends on b through z.</p></div></details><details class="question"><summary>Q4. For ReLU f(z)=max(0,z), which statements are true?</summary><div class="answer"><p><strong>Options / task:</strong> A. Derivative is 1 for z>0 and 0 for z<0; B. Avoids vanishing gradients in positive domain; C. Differentiable everywhere including z=0; D. Induces sparse activations.</p><p><strong>Answer:</strong> A, B, D</p><p>For z>0 its derivative is 1; for z<0 it is 0. The positive region avoids sigmoid-like gradient shrinkage, and negative inputs become exact zeros. ReLU is not differentiable at z=0.</p></div></details><details class="question"><summary>Q5. A converged homogeneous perceptron uses wᵀx≥0 for +1 and otherwise −1. Into how many connected regions does the hyperplane divide the space?</summary><div class="answer"><p><strong>Options / task:</strong> A. Infinitely many regions; B. 2; C. 7; D. Cannot be determined without data distribution.</p><p><strong>Answer:</strong> 2</p><p>A single hyperplane wᵀx=0 divides the space into two half-spaces, regardless of the dimension.</p></div></details><details class="question"><summary>Q6. A 2-layer network has a ReLU hidden neuron, all weights 1 and biases 0. Its outputs are 0 for x=0 and 2 for x=2. Which output activations fit?</summary><div class="answer"><p><strong>Options / task:</strong> A. Sigmoid; B. Tanh; C. ReLU; D. Linear/Identity.</p><p><strong>Answer:</strong> ReLU and Linear/Identity</p><p>The hidden output is ReLU(x), so it is 0 and 2 for those inputs. Both identity and ReLU preserve these non-negative values; sigmoid and tanh cannot output 2.</p></div></details><details class="question"><summary>Q7. A fully connected network has input [-6,2,1,-3,2], 80 hidden layers of 10 ReLU neurons, all weights 1, no biases, and a sigmoid output. What is the first-pass output?</summary><div class="answer"><p><strong>Options / task:</strong> Numeric answer: first forward-pass output (expected range 0.45–0.55).</p><p><strong>Answer:</strong> 0.5</p><p>The first-layer weighted sum is −6+2+1−3+2=−4, so each ReLU output is 0. All later hidden outputs remain 0. The output sigmoid is σ(0)=0.5.</p></div></details><details class="question"><summary>Q8. For house-price regression with a few extreme outliers, which loss should be considered for robust behaviour and smoother convergence?</summary><div class="answer"><p><strong>Options / task:</strong> A. Mean Squared Error; B. Sum Squared Error; C. Huber Loss; D. Binary cross-entropy.</p><p><strong>Answer:</strong> Huber loss</p><p>Huber loss is quadratic for small residuals and linear for large residuals, so extreme errors do not dominate quadratically as they do with MSE.</p></div></details><details class="question"><summary>Q9. PyTorch adds a CUDA tensor to a CPU tensor. What happens?</summary><div class="answer"><p><strong>Options / task:</strong> A. Prints cuda:0; B. Prints cpu; C. Raises RuntimeError due to different devices; D. Automatically moves b to GPU.</p><p><strong>Answer:</strong> RuntimeError due to device mismatch</p><p>PyTorch does not automatically move one tensor to another device for elementwise addition. Move both tensors to the same device explicitly.</p></div></details><details class="question"><summary>Q10. Let x=torch.arange(12).reshape(3,4); y=x[1:,:3]. What is y[0,2]?</summary><div class="answer"><p><strong>Options / task:</strong> A. 2; B. 6; C. 7; D. 8.</p><p><strong>Answer:</strong> 6</p><p>x rows are [0,1,2,3], [4,5,6,7], [8,9,10,11]. The slice gives [[4,5,6],[8,9,10]], so row 0, column 2 is 6.</p></div></details><details class="question"><summary>Q11. x=torch.tensor([3.0],requires_grad=True); y=x*2; z=y**2; z.backward(). What is x.grad?</summary><div class="answer"><p><strong>Options / task:</strong> A. 0; B. 12.0; C. 18.0; D. 24.0; E. Error.</p><p><strong>Answer:</strong> tensor([24.])</p><p>z=(2x)²=4x², so dz/dx=8x. At x=3, the derivative is 24.</p></div></details><details class="question"><summary>Q12. A has shape (3,4), B has shape (4,), and C=A*B. What happens?</summary><div class="answer"><p><strong>Options / task:</strong> A. Shape mismatch error; B. B broadcasts across rows to (3,4); C. B broadcasts column-wise to (3,1); D. Result collapses to (3,1).</p><p><strong>Answer:</strong> B broadcasts across each row; C has shape (3,4).</p><p>Broadcasting aligns dimensions from the right: B behaves as (1,4), then expands across 3 rows.</p></div></details><details class="question"><summary>Q13. For x=[[2,4,6],[1,3,5]], compare the global mean, mean of column means, and mean of row means.</summary><div class="answer"><p><strong>Options / task:</strong> A. m1=v1=v2; B. m1=v1 but not v2; C. m1=v2 but not v1; D. all differ.</p><p><strong>Answer:</strong> All are 3.5</p><p>The global mean is 21/6=3.5. Column means are [1.5,3.5,5.5], averaging to 3.5. Row means are [4,3], averaging to 3.5 because both rows have equal length.</p></div></details><h3>Part B — Week 1 mock questions (42 questions)</h3><p><strong>Source label:</strong> these 42 questions are from the Week 1 mock set you supplied. Explanations below recompute the answers and show the method rather than relying on the recorded selection status.</p><details class="question"><summary>Q1. An MP neuron has 3 binary inputs, unit weights, and outputs 1 when the sum is at least 2. For how many of the 8 input combinations is the output 1?</summary><div class="answer"><p><strong>Options:</strong> A. 3 · B. 4 · C. 5 · D. 6</p><p><strong>Answer:</strong> 4</p><p>Exactly two inputs are 1 in C(3,2)=3 combinations, and all three are 1 in one combination. Total=3+1=4.</p></div></details><details class="question"><summary>Q2. Which Boolean function of two inputs cannot be represented by a single MP threshold neuron?</summary><div class="answer"><p><strong>Options:</strong> A. AND · B. OR · C. XOR · D. At least one input is 1</p><p><strong>Answer:</strong> XOR</p><p>AND, OR and the 'at least one input is 1' function are linearly separable. XOR labels opposite corners positive and cannot be split by one line.</p></div></details><details class="question"><summary>Q3. Four binary inputs have unit weights; output 1 only when at least 3 inputs are 1. What threshold θ is needed?</summary><div class="answer"><p><strong>Options:</strong> A. 2 · B. 3 · C. 4 · D. 1</p><p><strong>Answer:</strong> 3</p><p>The weighted sum equals the number of ones. A threshold of 3 activates exactly when the count is 3 or 4.</p></div></details><details class="question"><summary>Q4. A perceptron has w=(2,−1), b=−1 and outputs 1 if w·x+b≥0. Outputs for (1,2) and (2,1)?</summary><div class="answer"><p><strong>Options:</strong> A. 0 and 1 · B. 1 and 0 · C. 0 and 0 · D. 1 and 1</p><p><strong>Answer:</strong> 0 and 1</p><p>For (1,2): 2−2−1=−1, so output 0. For (2,1): 4−1−1=2, so output 1.</p></div></details><details class="question"><summary>Q5. Start w=(0,0). For point (1,2) with label 1, add x if misclassified; then process (−1,1) with label 0 and subtract x if misclassified. Final weights?</summary><div class="answer"><p><strong>Options:</strong> A. (2,1) · B. (0,3) · C. (1,2) · D. (2,3)</p><p><strong>Answer:</strong> (2,1)</p><p>At the first point, w·x=0 so it predicts 0 under the strict >0 rule; update to (1,2). The second point scores −1+2=1, predicts 1, so subtract (−1,1) to obtain (2,1).</p></div></details><details class="question"><summary>Q6. What is the sigmoid derivative at z=0?</summary><div class="answer"><p><strong>Options:</strong> A. 0.25 · B. 0.5 · C. 1 · D. 0</p><p><strong>Answer:</strong> 0.25</p><p>σ(0)=0.5 and σ′=σ(1−σ), so σ′(0)=0.5×0.5=0.25.</p></div></details><details class="question"><summary>Q7. A sigmoid neuron has w=2, b=−1 and x=1. Output rounded to two decimals?</summary><div class="answer"><p><strong>Options:</strong> A. 0.5 · B. 0.73 · C. 0.88 · D. 0.27</p><p><strong>Answer:</strong> 0.73</p><p>z=wx+b=2−1=1; σ(1)=1/(1+e⁻¹)≈0.7311.</p></div></details><details class="question"><summary>Q8. How many trainable parameters are in a fully connected network 4→5→3→2?</summary><div class="answer"><p><strong>Options:</strong> A. 45 · B. 51 · C. 52 · D. 60</p><p><strong>Answer:</strong> 51</p><p>Layer counts: 4×5+5=25; 5×3+3=18; 3×2+2=8. Total=25+18+8=51.</p></div></details><details class="question"><summary>Q9. x=(2,1), W=[[1,2],[−1,1]], h=ReLU(Wx), output y=(1,5)·h−1. What is y?</summary><div class="answer"><p><strong>Options:</strong> A. 3 · B. 4 · C. 8 · D. −2</p><p><strong>Answer:</strong> 3</p><p>Wx=(4,−1), ReLU gives h=(4,0). The output is 1×4+5×0−1=3.</p></div></details><details class="question"><summary>Q10. Which MLP statements are correct: (i) stacked linear layers collapse to one linear/affine layer; (ii) one hidden layer with enough nonlinear units can approximate continuous functions on a bounded domain; (iii) one perceptron can represent XOR; (iv) an MLP with one hidden layer can represent XOR?</summary><div class="answer"><p><strong>Options:</strong> A. Stacked linear layers collapse to one linear/affine layer · B. One hidden layer with enough nonlinear units can approximate continuous functions on a bounded domain · C. A single perceptron represents XOR · D. XOR can be represented by an MLP with one hidden layer</p><p><strong>Answer:</strong> (i), (ii) and (iv)</p><p>Compositions of linear/affine maps remain linear/affine. The universal approximation result supports sufficiently wide nonlinear networks under suitable conditions. A single perceptron cannot represent XOR, but a hidden layer can.</p></div></details><details class="question"><summary>Q11. Softmax logits are (ln2, ln3, ln5). Probability of the third class?</summary><div class="answer"><p><strong>Options:</strong> A. 0.3 · B. 0.4 · C. 0.5 · D. 0.6</p><p><strong>Answer:</strong> 0.5</p><p>Exponentiating gives unnormalized scores (2,3,5); the sum is 10, so the third probability is 5/10=0.5.</p></div></details><details class="question"><summary>Q12. Compute ReLU(−3)+ReLU(2)+tanh(0).</summary><div class="answer"><p><strong>Options:</strong> A. 0 · B. 2 · C. −1 · D. 5</p><p><strong>Answer:</strong> 2</p><p>ReLU(−3)=0, ReLU(2)=2 and tanh(0)=0. The sum is 2.</p></div></details><details class="question"><summary>Q13. Which activation statements are correct: sigmoid output is between 0 and 1; tanh is zero-centred; sigmoid/tanh saturate at large |z|; ReLU derivative is 1 for every input?</summary><div class="answer"><p><strong>Options:</strong> A. Sigmoid output lies between 0 and 1 · B. Tanh is zero-centred · C. Sigmoid/tanh saturate for large |z| and may cause vanishing gradients · D. ReLU derivative is 1 for every input</p><p><strong>Answer:</strong> The first three statements</p><p>Sigmoid outputs values strictly between 0 and 1, tanh ranges from −1 to 1 and is centred at zero, and both saturate at large magnitudes. ReLU derivative is 0 for negative inputs and 1 for positive inputs (undefined at zero in the strict calculus sense).</p></div></details><details class="question"><summary>Q14. Leaky ReLU is x for x>0 and 0.1x for x≤0. Find f(−5).</summary><div class="answer"><p><strong>Options:</strong> A. −0.5 · B. 0 · C. −5 · D. 0.5</p><p><strong>Answer:</strong> −0.5</p><p>Because −5≤0, use the negative branch: 0.1×(−5)=−0.5.</p></div></details><details class="question"><summary>Q15. Minimize f(w)=w² from w=4 with learning rate 0.25. One update?</summary><div class="answer"><p><strong>Options:</strong> A. 2 · B. 3 · C. 3.5 · D. 0</p><p><strong>Answer:</strong> 2</p><p>f′(w)=2w=8 at w=4. The update is 4−0.25×8=2.</p></div></details><details class="question"><summary>Q16. Minimize L(w)=(w−3)² from w=0 with learning rate 0.1. Find w after two updates.</summary><div class="answer"><p><strong>Options:</strong> A. 1.08 · B. 1.2 · C. 0.6 · D. 1.8</p><p><strong>Answer:</strong> 1.08</p><p>Gradient=2(w−3). First update: w₁=0−0.1(−6)=0.6. Second gradient=2(0.6−3)=−4.8, so w₂=0.6+0.48=1.08.</p></div></details><details class="question"><summary>Q17. For f(w)=w², start w=1 and learning rate 1.5. What is w after two updates?</summary><div class="answer"><p><strong>Options:</strong> A. 4 · B. −4 · C. 0.25 · D. 0</p><p><strong>Answer:</strong> 4</p><p>Gradient=2w. First: w₁=1−1.5(2)=−2. Second: w₂=−2−1.5(−4)=4. The large step overshoots and diverges/oscillates.</p></div></details><details class="question"><summary>Q18. 1,000 training samples, batch size 50, 20 epochs. Number of updates?</summary><div class="answer"><p><strong>Options:</strong> A. 20 · B. 400 · C. 1000 · D. 20000</p><p><strong>Answer:</strong> 400</p><p>There are 1000/50=20 batches per epoch; 20×20=400 updates.</p></div></details><details class="question"><summary>Q19. 5,000 reviews, 70% training, batch size 70, 10 epochs. Number of updates?</summary><div class="answer"><p><strong>Options:</strong> A. 350 · B. 500 · C. 3500 · D. 35000</p><p><strong>Answer:</strong> 500</p><p>Training examples=3500. There are 3500/70=50 batches per epoch, and 50×10=500 updates.</p></div></details><details class="question"><summary>Q20. Which are true: SGD updates per sample; batch GD uses the whole dataset per update; mini-batch size equal to dataset size equals batch GD; SGD gradient always equals full-batch gradient?</summary><div class="answer"><p><strong>Options:</strong> A. SGD updates after each sample · B. Batch GD uses the full dataset for every update · C. Mini-batch size equal to dataset size equals batch GD · D. SGD gradient always equals full-batch gradient</p><p><strong>Answer:</strong> First three statements</p><p>SGD uses one sample, batch GD uses the full training set, and a mini-batch equal to the full set is batch GD. A one-sample gradient is generally only an estimate, not exactly the full-data gradient.</p></div></details><details class="question"><summary>Q21. Which has the noisiest parameter updates: batch GD, mini-batch 32, SGD batch size 1, or mini-batch 256?</summary><div class="answer"><p><strong>Options:</strong> A. Batch GD · B. Mini-batch size 32 · C. SGD with batch size 1 · D. Mini-batch size 256</p><p><strong>Answer:</strong> SGD with batch size 1</p><p>A single example gives the highest-variance estimate among these choices; larger batches usually make gradient estimates less noisy.</p></div></details><details class="question"><summary>Q22. True y=(1,2,3), predictions=(2,2,5). Compute MSE to two decimals.</summary><div class="answer"><p><strong>Options:</strong> A. 1 · B. 1.67 · C. 2.33 · D. 5</p><p><strong>Answer:</strong> 1.67</p><p>Errors are (1,0,2); squared errors are (1,0,4). Mean=(1+0+4)/3=5/3≈1.67.</p></div></details><details class="question"><summary>Q23. For the same true values and predictions, compute MAE.</summary><div class="answer"><p><strong>Options:</strong> A. 1 · B. 1.67 · C. 0.5 · D. 3</p><p><strong>Answer:</strong> 1</p><p>Absolute errors are (1,0,2). Their mean is 3/3=1.</p></div></details><details class="question"><summary>Q24. Binary cross-entropy for y=1 and predicted p=0.8 (natural log)?</summary><div class="answer"><p><strong>Options:</strong> A. 0.22 · B. 0.8 · C. 1.61 · D. 0.51</p><p><strong>Answer:</strong> 0.22</p><p>For y=1, loss=−ln(p)=−ln(0.8)≈0.2231, rounded to 0.22.</p></div></details><details class="question"><summary>Q25. Average BCE for (y=1,p=0.8) and (y=0,p=0.1)?</summary><div class="answer"><p><strong>Options:</strong> A. 0.16 · B. 0.33 · C. 0.22 · D. 0.11</p><p><strong>Answer:</strong> 0.16</p><p>First loss=−ln(0.8)≈0.2231. Second loss=−ln(1−0.1)=−ln(0.9)≈0.1054. Average≈0.1643, so 0.16.</p></div></details><details class="question"><summary>Q26. Softmax predicts (0.2,0.5,0.3), and the true class is the second. Categorical cross-entropy?</summary><div class="answer"><p><strong>Options:</strong> A. 0.69 · B. 0.5 · C. 1.2 · D. 1.61</p><p><strong>Answer:</strong> 0.69</p><p>For one-hot target, loss is −ln(probability of the true class)=−ln(0.5)≈0.6931.</p></div></details><details class="question"><summary>Q27. Which task/loss pairs are appropriate: house prices/MSE; binary classification with sigmoid/BCE; multiclass softmax/categorical CE; house prices/BCE?</summary><div class="answer"><p><strong>Options:</strong> A. House prices + MSE · B. Binary classification + sigmoid/BCE · C. Single-label multiclass + softmax/categorical CE · D. House prices + BCE</p><p><strong>Answer:</strong> First three pairs</p><p>MSE is common for regression; BCE for binary classification; categorical cross-entropy for single-label multiclass classification. BCE is not the standard loss for unrestricted continuous house prices.</p></div></details><details class="question"><summary>Q28. A Dense layer has 784 input features and 10 units. Number of trainable parameters?</summary><div class="answer"><p><strong>Options:</strong> A. 7840 · B. 7850 · C. 794 · D. 8000</p><p><strong>Answer:</strong> 7,850</p><p>Weights=784×10=7840; biases=10; total=7850.</p></div></details><details class="question"><summary>Q29. Output layer for exactly one of 5 classes?</summary><div class="answer"><p><strong>Options:</strong> A. Dense(1, sigmoid) · B. Dense(5, softmax) · C. Dense(5, ReLU) · D. Dense(1, linear)</p><p><strong>Answer:</strong> Dense(5, activation='softmax')</p><p>Five logits/probabilities are needed, and softmax normalizes the class scores into a distribution.</p></div></details><details class="question"><summary>Q30. Keras model 20→64→32→1, with biases in all Dense layers. Trainable parameters?</summary><div class="answer"><p><strong>Options:</strong> A. 3457 · B. 3424 · C. 3456 · D. 3500</p><p><strong>Answer:</strong> 3,457</p><p>First layer: 20×64+64=1344. Second: 64×32+32=2080. Output: 32×1+1=33. Total=1344+2080+33=3457.</p></div></details><details class="question"><summary>Q31. 640 samples, epochs=5, batch_size=32. How many updates?</summary><div class="answer"><p><strong>Options:</strong> A. 20 · B. 100 · C. 640 · D. 3200</p><p><strong>Answer:</strong> 100</p><p>640/32=20 batches per epoch; 20×5=100 updates.</p></div></details><details class="question"><summary>Q32. Output layer for predicting a real-valued house price?</summary><div class="answer"><p><strong>Options:</strong> A. Dense(1, sigmoid) · B. Dense(1) with linear activation · C. Dense(1, softmax) · D. Dense(2, softmax)</p><p><strong>Answer:</strong> Dense(1) with linear/no activation</p><p>A linear output is not restricted to a probability interval and can predict any real value.</p></div></details><details class="question"><summary>Q33. ŷ=wx, L=(ŷ−y)², x=2,y=5,w=1, learning rate 0.01. New w?</summary><div class="answer"><p><strong>Options:</strong> A. 1.12 · B. 0.88 · C. 1.24 · D. −12</p><p><strong>Answer:</strong> 1.12</p><p>dL/dw=2(wx−y)x=2(2−5)×2=−12. Update w_new=1−0.01(−12)=1.12.</p></div></details><details class="question"><summary>Q34. Momentum v_t=0.9v_(t−1)+g, w_t=w_(t−1)−0.1v_t, v₀=0,w₀=1,g=2. Find w₂.</summary><div class="answer"><p><strong>Options:</strong> A. 0.42 · B. 0.6 · C. 0.4 · D. 0.62</p><p><strong>Answer:</strong> 0.42</p><p>v₁=2 and w₁=1−0.2=0.8. v₂=0.9×2+2=3.8, so w₂=0.8−0.38=0.42.</p></div></details><details class="question"><summary>Q35. Which optimization statements are true: momentum accumulates past gradients; Adam estimates first and second moments; small learning rate slows convergence; larger learning rate always guarantees faster convergence?</summary><div class="answer"><p><strong>Options:</strong> A. Momentum accumulates past gradients · B. Adam estimates first and second gradient moments · C. Small learning rate slows convergence · D. Larger learning rate always guarantees faster convergence</p><p><strong>Answer:</strong> First three statements</p><p>Momentum smooths and reinforces consistent directions; Adam uses first/second moment estimates; a small step may be slow. A larger rate can overshoot or diverge, so it never guarantees faster convergence.</p></div></details><details class="question"><summary>Q36. Which listed optimizer adapts each parameter's learning rate using past squared gradients: plain SGD, momentum SGD, Adam, or batch GD?</summary><div class="answer"><p><strong>Options:</strong> A. Plain SGD · B. SGD with momentum · C. Adam · D. Batch GD</p><p><strong>Answer:</strong> Adam</p><p>Adam uses an adaptive denominator based on moving averages of squared gradients, alongside a first-moment estimate.</p></div></details><details class="question"><summary>Q37. If sigmoid(2)≈0.88, what is sigmoid(−2)?</summary><div class="answer"><p><strong>Options:</strong> A. 0.12 · B. 0.88 · C. 0.5 · D. −0.88</p><p><strong>Answer:</strong> 0.12</p><p>Sigmoid symmetry gives σ(−z)=1−σ(z), so σ(−2)≈1−0.88=0.12.</p></div></details><details class="question"><summary>Q38. A 4-class softmax has probabilities 0.1, 0.2 and 0.3 for three classes. Fourth probability?</summary><div class="answer"><p><strong>Options:</strong> A. 0.3 · B. 0.4 · C. 0.5 · D. 0.6</p><p><strong>Answer:</strong> 0.4</p><p>Softmax probabilities sum to 1, so the missing probability is 1−(0.1+0.2+0.3)=0.4.</p></div></details><details class="question"><summary>Q39. Key advantage of deep learning over hand-crafted features?</summary><div class="answer"><p><strong>Options:</strong> A. Learns useful feature representations from raw data · B. Needs no training data · C. Always trains faster · D. Cannot overfit</p><p><strong>Answer:</strong> It can learn useful feature representations from raw data.</p><p>Deep networks can learn task-relevant representations during training, although they still need data and can overfit.</p></div></details><details class="question"><summary>Q40. Which hidden activation is least prone to vanishing gradients for large positive inputs: sigmoid, tanh, ReLU or softmax?</summary><div class="answer"><p><strong>Options:</strong> A. Sigmoid · B. Tanh · C. ReLU · D. Softmax</p><p><strong>Answer:</strong> ReLU</p><p>For positive inputs, ReLU's derivative is 1, whereas sigmoid and tanh saturate. Softmax is generally an output normalization, not the typical hidden activation in this comparison.</p></div></details><details class="question"><summary>Q41. Inverted dropout keep probability is 0.8; a kept activation is 4. What value is passed on?</summary><div class="answer"><p><strong>Options:</strong> A. 3.2 · B. 4 · C. 5 · D. 0.8</p><p><strong>Answer:</strong> 5</p><p>Inverted dropout scales kept activations by 1/p during training: 4/0.8=5. This preserves the expected activation.</p></div></details><details class="question"><summary>Q42. Which dropout statements are true: neurons are randomly dropped during training; all neurons are used at test time; dropout resembles an ensemble of subnetworks; dropout increases trainable parameters?</summary><div class="answer"><p><strong>Options:</strong> A. Neurons randomly dropped during training · B. All neurons used at test time · C. Dropout resembles an ensemble of subnetworks · D. Dropout increases trainable parameters</p><p><strong>Answer:</strong> First three statements</p><p>Dropout masks units during training, uses the full network at inference (with inverted-dropout scaling already handled), and can be viewed as sampling subnetworks. It does not add trainable parameters.</p></div></details></section>

        <section id="assignments">
      <h2>19. Week 1 assignments: portal placement</h2>
      <p>
        The Week 1 navbar sequence supplied for these notes places both
        assignment items at the end of Week 1:
      </p>
      <ul>
        <li><strong>Week 1 Practice assignment 1</strong></li>
        <li><strong>Week 1 Graded Assignment 1</strong></li>
      </ul>
      <p>
        The supplied sequence does not include a separate item labelled
        “Activity Assignment”. Use the official portal for the live
        assignment questions, deadlines and submission instructions.
      </p>
    </section>

    <section id="revision">
      <h2>20. Formula sheet and quick revision</h2>
      <table>
        <thead><tr><th>Topic</th><th>Formula / reminder</th></tr></thead>
        <tbody>
          <tr><td>Neuron weighted sum</td><td>\(z=\sum_i w_ix_i+b\)</td></tr>
          <tr><td>ReLU</td><td>\(\max(0,x)\)</td></tr>
          <tr><td>Sigmoid</td><td>\(\frac{1}{1+e^{-x}}\)</td></tr>
          <tr><td>Tanh</td><td>Output lies in (-1, 1)</td></tr>
          <tr><td>Dense-layer parameters</td><td>\((n_{\text{in}}+1)n_{\text{out}}\)</td></tr>
          <tr><td>Linear regression</td><td>\(\hat y=wx+b\)</td></tr>
          <tr><td>MSE</td><td>\(\frac{1}{N}\sum_i(y_i-\hat y_i)^2\)</td></tr>
          <tr><td>Gradient descent</td><td>\(\theta\leftarrow\theta-\eta\nabla_\theta L\)</td></tr>
        </tbody>
      </table>
      <details>
        <summary>Self-test: Why can a reshape operation fail?</summary>
        <p class="answer">
          Because the requested shape may require a different number of
          elements from the original tensor. For example, 12 elements cannot
          be reshaped into shape (5, 3), which requires 15 elements.
        </p>
      </details>
      <details>
        <summary>Self-test: What does loss.backward() do?</summary>
        <p class="answer">
          It computes gradients of the loss with respect to relevant
          tensors that participate in gradient tracking. It does not itself
          perform the optimizer's parameter update.
        </p>
      </details>
      <details>
        <summary>Self-test: What is the difference between a parameter and a hyperparameter?</summary>
        <p class="answer">
          Weights and biases are learned parameters. Learning rate, batch
          size and number of epochs are hyperparameters chosen for training.
        </p>
      </details>
    </section>
    
  </article>
</main>

<footer class="site-footer">
  IIT Madras BS Data Science · BSDA2001
  <br>Week 1: neural networks, PyTorch, tensors and training fundamentals.
</footer>
</template>

<script>
import SiteHeader from '../components/SiteHeader.vue';
import CourseSidebar from '../components/CourseSidebar.vue';

export default {
  components: { SiteHeader, CourseSidebar },
};
</script>
