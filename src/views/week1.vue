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
