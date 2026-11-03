<template>
    <div class="ga-document">
<div class="container py-4 py-md-5">

        <!-- Page heading -->
        <header class="hero mb-4">
            <span class="badge bg-warning text-dark mb-3">
                IITM BS TDS | Week 4 GA
            </span>

            <h1 class="fw-bold">Question 7: Image Transformations</h1>

            <p class="mb-0">
                Understand the error in a PyTorch image preprocessing pipeline,
                correct the code, and learn why the correction works.
            </p>
        </header>

        <!-- Original question -->
        <section class="card solution-card mb-4">
            <div class="card-body p-4">
                <h2 class="h4 mb-3">1. The original question</h2>

                <p>
                    Consider the following Python code for transforming a PIL
                    input image. Assume that <code>image_mean</code> and
                    <code>image_std</code> are properly defined.
                </p>

                <pre class="code-box"><code>import torchvision.transforms as transforms

def transform_data():
    train_transform = transforms.Compose([
        transforms.Resize((100, 100)),
        transforms.RandomHorizontalFlip(p=0.1),
        transforms.RandomRotation(degrees=5),
        transforms.ColorJitter(
            brightness=0.2,
            saturation=0.2
        ),
        transforms.Normalize(mean=image_mean, std=image_std),
        transforms.ToTensor()
    ])

    return train_transform</code></pre>

                <p class="mt-3 mb-0">
                    <strong>Question:</strong> What is wrong with the above code?
                </p>
            </div>
        </section>

        <!-- Correct answer -->
        <section class="card solution-card mb-4">
            <div class="card-body p-4">
                <h2 class="h4 mb-3">2. Correct answer</h2>

                <div class="correct-answer">
                    <h3 class="h5 text-success fw-bold">
                        Normalize() is placed before ToTensor().
                    </h3>

                    <p class="mb-0">
                        The input is a PIL image. The
                        <code>ToTensor()</code> transformation must be applied
                        before <code>Normalize()</code>, because
                        <code>Normalize()</code> expects a tensor image.
                    </p>
                </div>
            </div>
        </section>

        <!-- Why it is wrong -->
        <section class="card solution-card mb-4">
            <div class="card-body p-4">
                <h2 class="h4 mb-3">3. Why is the original code wrong?</h2>

                <p>
                    <code>transforms.Compose()</code> executes each
                    transformation in the order in which it appears in the list.
                    The output of one transformation becomes the input to the next.
                </p>

                <div class="wrong-answer mb-4">
                    <strong>Original order:</strong>
                    <ol class="mt-2 mb-0">
                        <li>Resize the PIL image.</li>
                        <li>Randomly flip the image.</li>
                        <li>Randomly rotate the image.</li>
                        <li>Adjust brightness and saturation.</li>
                        <li>
                            <strong>Normalize the image while it is still a
                            PIL image — this is the error.</strong>
                        </li>
                        <li>Convert the image to a tensor.</li>
                    </ol>
                </div>

                <h3 class="h5">What does ToTensor() do?</h3>

                <p>
                    A PIL image is a common Python image representation.
                    PyTorch models typically work with tensors, which are
                    multidimensional numerical arrays.
                </p>

                <ul>
                    <li>
                        Converts the image into a PyTorch tensor.
                    </li>
                    <li>
                        Changes the image layout from height × width × channels
                        to channels × height × width.
                    </li>
                    <li>
                        For typical 8-bit PIL images, converts pixel values
                        from the range 0–255 to floating-point values in
                        the range 0–1.
                    </li>
                </ul>

                <h3 class="h5">What does Normalize() do?</h3>

                <p>
                    It adjusts each channel using the formula:
                </p>

                <div class="text-center bg-light p-3 rounded mb-3">
                    <strong>
                        Normalized value = (Pixel value − Mean) / Standard deviation
                    </strong>
                </div>

                <p class="mb-0">
                    In torchvision, <code>Normalize()</code> expects a tensor
                    image, so it cannot be used directly on the PIL image in
                    this pipeline. Putting <code>ToTensor()</code> first
                    supplies the expected input.
                </p>
            </div>
        </section>

        <!-- Corrected code -->
        <section class="card solution-card mb-4">
            <div class="card-body p-4">
                <h2 class="h4 mb-3">4. Corrected Python code</h2>

                <p>
                    The solution is to swap the last two transformations.
                    Keep the resizing and image augmentation steps unchanged.
                </p>

                <pre class="code-box"><code>import torchvision.transforms as transforms

def transform_data():
    train_transform = transforms.Compose([
        transforms.Resize((100, 100)),
        transforms.RandomHorizontalFlip(p=0.1),
        transforms.RandomRotation(degrees=5),
        transforms.ColorJitter(
            brightness=0.2,
            saturation=0.2
        ),
        transforms.ToTensor(),
        transforms.Normalize(
            mean=image_mean,
            std=image_std
        )
    ])

    return train_transform</code></pre>

                <button
                    class="btn btn-primary mt-3"
                    @click="copyCode"
                    type="button"
                >
                    Copy corrected Python code
                </button>

                <span class="ms-2 small" :class="copyStatusClass">{{ copyStatus }}</span>
            </div>
        </section>

        <!-- Step-by-step pipeline -->
        <section class="card solution-card mb-4">
            <div class="card-body p-4">
                <h2 class="h4 mb-4">5. Understand the correct order</h2>

                <div class="mb-3">
                    <span class="step-number">1</span>
                    <strong>Resize((100, 100))</strong>
                    <p class="ms-5 mb-0">
                        Changes the image size to 100 × 100 pixels.
                    </p>
                </div>

                <hr>

                <div class="mb-3">
                    <span class="step-number">2</span>
                    <strong>RandomHorizontalFlip(p=0.1)</strong>
                    <p class="ms-5 mb-0">
                        Flips the image horizontally with a probability of 10%.
                    </p>
                </div>

                <hr>

                <div class="mb-3">
                    <span class="step-number">3</span>
                    <strong>RandomRotation(degrees=5)</strong>
                    <p class="ms-5 mb-0">
                        Randomly rotates the image by up to 5 degrees in
                        either direction.
                    </p>
                </div>

                <hr>

                <div class="mb-3">
                    <span class="step-number">4</span>
                    <strong>ColorJitter()</strong>
                    <p class="ms-5 mb-0">
                        Randomly adjusts brightness and saturation to create
                        variations in the training images.
                    </p>
                </div>

                <hr>

                <div class="mb-3">
                    <span class="step-number">5</span>
                    <strong>ToTensor()</strong>
                    <p class="ms-5 mb-0">
                        Converts the transformed PIL image into a tensor
                        suitable for PyTorch processing.
                    </p>
                </div>

                <hr>

                <div>
                    <span class="step-number">6</span>
                    <strong>Normalize(mean, std)</strong>
                    <p class="ms-5 mb-0">
                        Normalizes the tensor values using the specified
                        channel means and standard deviations.
                    </p>
                </div>
            </div>
        </section>

        <!-- Why the answer is correct -->
        <section class="card solution-card mb-4">
            <div class="card-body p-4">
                <h2 class="h4 mb-3">6. Why is this answer correct?</h2>

                <p>
                    The corrected pipeline follows the input requirements of
                    the transformations:
                </p>

                <div class="table-responsive">
                    <table class="table table-bordered align-middle">
                        <thead class="table-primary">
                            <tr>
                                <th>Transformation</th>
                                <th>Input used here</th>
                                <th>Purpose</th>
                            </tr>
                        </thead>

                        <tbody>
                            <tr>
                                <td>Resize</td>
                                <td>PIL image</td>
                                <td>Standardize image dimensions</td>
                            </tr>

                            <tr>
                                <td>RandomHorizontalFlip</td>
                                <td>PIL image</td>
                                <td>Data augmentation</td>
                            </tr>

                            <tr>
                                <td>RandomRotation</td>
                                <td>PIL image</td>
                                <td>Data augmentation</td>
                            </tr>

                            <tr>
                                <td>ColorJitter</td>
                                <td>PIL image</td>
                                <td>Color augmentation</td>
                            </tr>

                            <tr>
                                <td>ToTensor</td>
                                <td>PIL image</td>
                                <td>Convert to tensor</td>
                            </tr>

                            <tr>
                                <td>Normalize</td>
                                <td>Tensor image</td>
                                <td>Normalize pixel values</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <div class="alert alert-success mb-0">
                    <strong>Final conclusion:</strong>
                    <code>ToTensor()</code> must come before
                    <code>Normalize()</code>. This fixes the data-type mismatch
                    in the original transformation pipeline.
                </div>
            </div>
        </section>

        <!-- Quick revision -->
        <section class="card solution-card mb-4">
            <div class="card-body p-4">
                <h2 class="h4 mb-3">7. Quick revision for the exam</h2>

                <ul class="mb-0">
                    <li>
                        <strong>ToTensor:</strong> Converts a PIL image into
                        a tensor.
                    </li>
                    <li>
                        <strong>Normalize:</strong> Normalizes tensor values
                        using mean and standard deviation.
                    </li>
                    <li>
                        <strong>Compose:</strong> Runs transformations in
                        the listed order.
                    </li>
                    <li>
                        <strong>Remember:</strong> ToTensor comes before
                        Normalize in this pipeline.
                    </li>
                </ul>
            </div>
        </section>

        <footer class="text-center py-3">
            <small>
                IITM BS TDS | Week 4 GA | Question 7 | Beginner-friendly solution
            </small>
        </footer>

    </div>



    <!-- Bootstrap 5 JavaScript bundle -->
    <!-- <script
        src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js">
    </script> -->
    </div>
</template>

<script setup>
import { ref } from 'vue'

const copyStatus = ref('')
const copyStatusClass = ref('')

async function copyCode() {
  const code = `import torchvision.transforms as transforms

def transform_data():
    train_transform = transforms.Compose([
        transforms.Resize((100, 100)),
        transforms.RandomHorizontalFlip(p=0.1),
        transforms.RandomRotation(degrees=5),
        transforms.ColorJitter(
            brightness=0.2,
            saturation=0.2
        ),
        transforms.ToTensor(),
        transforms.Normalize(
            mean=image_mean,
            std=image_std
        )
    ])

    return train_transform`

  try {
    await navigator.clipboard.writeText(code)
    copyStatus.value = 'Code copied!'
    copyStatusClass.value = 'text-success'
  } catch {
    copyStatus.value = 'Automatic copying failed. Select and copy the code manually.'
    copyStatusClass.value = 'text-danger'
  }
}
</script>

<style scoped>
@import url("https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css");

        .ga-document {
            background-color: #f4f7fb;
            color: #212529;
            font-family: Arial, sans-serif;
            line-height: 1.7;
        }

        .hero {
            background: linear-gradient(135deg, #173b70, #3478c8);
            color: white;
            padding: 40px 20px;
            border-radius: 16px;
        }

        .solution-card {
            border: none;
            border-radius: 14px;
            box-shadow: 0 4px 18px rgba(0, 0, 0, 0.07);
        }

        .code-box {
            background-color: #17212f;
            color: #e5edf7;
            padding: 20px;
            border-radius: 10px;
            overflow-x: auto;
            font-size: 14px;
        }

        .highlight {
            color: #ffcc66;
            font-weight: bold;
        }

        .correct-answer {
            background-color: #d1e7dd;
            border-left: 5px solid #198754;
            padding: 18px;
            border-radius: 8px;
        }

        .wrong-answer {
            background-color: #f8d7da;
            border-left: 5px solid #dc3545;
            padding: 18px;
            border-radius: 8px;
        }

        .step-number {
            display: inline-flex;
            width: 34px;
            height: 34px;
            align-items: center;
            justify-content: center;
            background-color: #0d6efd;
            color: white;
            border-radius: 50%;
            font-weight: bold;
            margin-right: 10px;
        }

        .ga-document footer {
            color: #6c757d;
        }

</style>
