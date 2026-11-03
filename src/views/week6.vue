<template>
<SiteHeader page="week6" />
<main class="page-layout">
  <CourseSidebar page="week6" />
  <article class="content">
    <div class="note"><strong>How to study this page:</strong> Read the explanation, work through the example without looking at the solution, then answer the Questions and Solutions section. This page is built from the supplied Week 6 course resources and expanded with clearly labelled exam-style practice. Practice questions are not claimed to be official graded-assignment questions unless explicitly identified as such.</div>
    <section id="overview"><h2>Generative models: from recognition to creation</h2>
<p>A discriminative model learns to predict a label or conditional probability such as \(P(y\mid x)\). A generative model learns patterns in the data distribution so it can create new samples resembling training examples. A GAN is one approach to generative modelling.</p><p>In a GAN, two networks train in opposition: the <strong>generator</strong> creates synthetic examples and the <strong>discriminator</strong> estimates whether an input is real or generated. Neither network is a fixed rule; both are learned neural networks.</p>
</section>
<section id="architecture"><h2>Generator and discriminator</h2>
<ul><li><strong>Latent noise \(z\):</strong> a random vector sampled from a simple distribution.</li><li><strong>Generator \(G(z)\):</strong> transforms noise into a fake sample, such as an image.</li><li><strong>Discriminator \(D(x)\):</strong> outputs a score or probability indicating whether an input is real.</li></ul><p>The generator improves when it produces samples the discriminator struggles to reject. The discriminator improves when it distinguishes real training examples from generated ones.</p><p>GANs can be trained on images, but the basic idea applies to other data types too.</p>
</section>
<section id="objective"><h2>The adversarial objective</h2>
<p>A common original GAN objective is:</p><div class="eq">\(\min_G\max_D\;\mathbb{E}_{x\sim p_{data}}[\log D(x)]+\mathbb{E}_{z\sim p_z}[\log(1-D(G(z)))]\)</div><p>In plain language, the discriminator is trained to score real examples as real and generated examples as fake. The generator is trained to make generated examples score as real. In practical implementations, the generator often uses the non-saturating loss that maximizes \(\log D(G(z))\), because it can provide stronger gradients early in training.</p><p>Do not confuse the GAN objective with ordinary supervised training against a unique target image: for a random noise vector there is not one uniquely correct output.</p>
</section>
<section id="training"><h2>The two training loops</h2>
<ol><li>Sample a batch of real examples and a batch of noise vectors.</li><li>Generate fake examples with the generator.</li><li>Update the discriminator using real examples labelled real and fake examples labelled fake.</li><li>Sample fresh noise and generate fake examples again.</li><li>Update the generator using a loss that rewards fooling the discriminator. During this step, gradients must flow through the discriminator to the generator, while discriminator parameters are not intended to be updated.</li></ol><p>Both networks need their own optimizer. The order and gradient management matter: accidentally stepping the wrong optimizer or detaching generated samples can break learning.</p>
</section>
<section id="stability"><h2>Training problems and evaluation</h2>
<ul><li><strong>Mode collapse:</strong> the generator produces only a narrow variety of samples.</li><li><strong>Unstable dynamics:</strong> the discriminator may become too strong or the two networks may fail to improve together.</li><li><strong>Vanishing generator gradients:</strong> if the discriminator confidently rejects all fakes, the generator may receive weak learning signals under the original minimax loss.</li><li><strong>Quality vs diversity:</strong> samples can look realistic but be repetitive, or diverse but low quality.</li></ul><p>GAN training loss alone is not a reliable visual-quality score. Inspect sample grids over time and, where appropriate, use quantitative metrics such as FID with care.</p>
</section>
<section id="implementation"><h2>Implementation pattern and loss-label logic</h2>
<p>For a simple GAN with a sigmoid discriminator, binary cross-entropy is often used. When training the discriminator, real samples use target 1 and generated samples use target 0. When training the generator, generated samples use target 1 in the generator's loss: this tells the generator to make its fakes score as real.</p>
<pre><code># Conceptual order for one mini-batch
# 1. Train D: real -> target 1; fake.detach() -> target 0
# 2. Train G: generate fresh fake samples
# 3. Score fake with D; use target 1 for G's loss
# 4. Backpropagate G loss and step G's optimizer</code></pre>
<p><code>fake.detach()</code> during discriminator training stops that discriminator update from backpropagating into the generator. During generator training, do not detach the generated sample, because the generator needs the gradient through D to update itself. The discriminator's weights should not be stepped during the generator update.</p>
<p>For image generation, a fully connected network is a useful teaching baseline, while convolutional architectures such as DCGAN use convolutional layers to exploit spatial structure. The exact architecture depends on image size, channels and data complexity.</p></section>
<section id="questions"><h2>Week 6 questions and solutions</h2>
<p>Original exam-style practice based on the supplied GAN slides and live-coding notebook.</p><details class="question"><summary>Q1. What is the generator's input in a basic GAN?</summary><div class="answer"><p><strong>Answer:</strong> A random latent vector z.</p><p>The generator maps noise from a simple distribution into a synthetic data sample.</p></div></details><details class="question"><summary>Q2. What is the discriminator trained to do?</summary><div class="answer"><p><strong>Answer:</strong> Distinguish real training samples from generated samples.</p><p>During discriminator training, real samples target the real label and generated samples target the fake label.</p></div></details><details class="question"><summary>Q3. Why are there two optimizers in the common GAN training loop?</summary><div class="answer"><p><strong>Answer:</strong> The generator and discriminator have separate parameters and objectives.</p><p>Each optimizer updates its own network; the training alternates between discriminator and generator updates.</p></div></details><details class="question"><summary>Q4. During generator training, why might generated samples be assigned the target label 'real'?</summary><div class="answer"><p><strong>Answer:</strong> To make the generator improve samples so the discriminator classifies them as real.</p><p>The label is used in the generator's loss to create a gradient encouraging more realistic outputs; it does not mean the samples are actually real.</p></div></details><details class="question"><summary>Q5. What is mode collapse?</summary><div class="answer"><p><strong>Answer:</strong> The generator produces limited varieties of samples.</p><p>It may repeatedly generate similar outputs even when the real data distribution contains many modes or categories.</p></div></details><details class="question"><summary>Q6. True or false: a basic GAN generator is directly given the correct target image for every random noise vector.</summary><div class="answer"><p><strong>Answer:</strong> False</p><p>GANs do not require a unique target image paired with each noise vector; the discriminator provides adversarial feedback.</p></div></details><details class="question"><summary>Q7. If D(x)=0.95 for a real sample, what does that mean in a probability-output discriminator?</summary><div class="answer"><p><strong>Answer:</strong> The discriminator assigns a high probability that the sample is real.</p><p>A score near 1 is interpreted as real under the common sigmoid discriminator convention.</p></div></details><details class="question"><summary>Q8. Why is visual inspection of generated samples useful during GAN training?</summary><div class="answer"><p><strong>Answer:</strong> It helps reveal quality issues and mode collapse that a scalar loss may hide.</p><p>GAN losses can oscillate and are not always directly comparable to perceptual quality or sample diversity.</p></div></details>
</section>
  <section id="extra-question-bank-week6">
  <h2>Additional Week 6 Question Bank: Generative Adversarial Networks</h2>
  <p>These original exam-style questions cover the generator, discriminator, adversarial training and common GAN failure modes.</p>

  <details class="question">
    <summary>Q1. What is the primary role of the generator in a standard GAN?</summary>
    <div class="answer">
      <p><strong>Options:</strong> A. To classify every training image into a fixed class · B. To generate samples intended to resemble real training data · C. To calculate only the test accuracy · D. To remove the discriminator from training</p>
      <p><strong>Answer:</strong> B</p>
      <p>The generator transforms a noise vector or latent input into a synthetic sample. It is trained to produce samples that the discriminator has difficulty distinguishing from real data.</p>
    </div>
  </details>

  <details class="question">
    <summary>Q2. What is the discriminator trained to do?</summary>
    <div class="answer">
      <p><strong>Options:</strong> A. Distinguish real samples from generated samples · B. Generate random noise only · C. Reduce every image to one pixel · D. Predict the learning rate</p>
      <p><strong>Answer:</strong> A</p>
      <p>The discriminator receives real and generated samples and learns to distinguish between them. Its feedback supplies the learning signal used to improve the generator.</p>
    </div>
  </details>

  <details class="question">
    <summary>Q3. During a generator update, what is the usual goal?</summary>
    <div class="answer">
      <p><strong>Options:</strong> A. Make generated samples easier for the discriminator to identify · B. Improve the generator so its samples are more likely to be classified as real · C. Permanently freeze both networks · D. Train only on real samples and discard generated samples</p>
      <p><strong>Answer:</strong> B</p>
      <p>The generator is optimized against the discriminator's feedback. In the common non-saturating formulation, the generator tries to increase the discriminator's predicted probability that generated samples are real.</p>
    </div>
  </details>

  <details class="question">
    <summary>Q4. What does mode collapse mean in GAN training?</summary>
    <div class="answer">
      <p><strong>Options:</strong> A. The generator produces very limited varieties of samples · B. The discriminator has no parameters · C. Every generated image has necessarily perfect quality · D. The training dataset becomes larger</p>
      <p><strong>Answer:</strong> A</p>
      <p>Mode collapse occurs when the generator produces a narrow range of outputs and fails to represent the diversity of the real data distribution.</p>
    </div>
  </details>

  <details class="question">
    <summary>Q5. Why can GAN training be unstable?</summary>
    <div class="answer">
      <p><strong>Options:</strong> A. The generator and discriminator are competing objectives that must be balanced · B. GANs do not use trainable parameters · C. The generator never receives a gradient · D. The discriminator is always correct from the beginning</p>
      <p><strong>Answer:</strong> A</p>
      <p>The two networks are trained in opposition. If one becomes too strong or updates at an unsuitable rate, the other may receive weak or unhelpful learning signals. Training balance and stability are important challenges.</p>
    </div>
  </details>

  <details class="question">
    <summary>Q6. When training the generator, why is the discriminator often kept fixed for that update?</summary>
    <div class="answer">
      <p><strong>Options:</strong> A. To prevent gradients from passing through the discriminator's computation to the generator · B. To allow the generator to receive gradients through the discriminator while avoiding an optimizer update to discriminator parameters · C. To permanently remove the discriminator · D. To make all discriminator outputs exactly 0</p>
      <p><strong>Answer:</strong> B</p>
      <p>The discriminator's parameters are not updated during the generator step, but its operations still provide gradients back to the generated samples and thus to the generator. In code, avoid stepping the discriminator optimizer during this phase; implementations commonly freeze discriminator parameter gradients to save computation while preserving the gradient path to the generator.</p>
    </div>
  </details>

  <p><strong>Further practice:</strong> <a href="https://quizpractice.space/" target="_blank" rel="noopener">QuizPractice</a> · <a href="https://quizspacee.com/pyq/dl-genai/quiz-2" target="_blank" rel="noopener">DL/GenAI Quiz 2 past papers</a></p>
</section>
    <section id="sources"><h2>Sources and scope</h2><p>These notes synthesise the supplied Week 6 slides and live-session notebooks. Examples are teaching examples and may simplify code for clarity. Use the linked past-paper resources for additional timed practice; their questions may require sign-in and should be treated as independent practice material.</p><p><a href="https://quizpractice.space/" target="_blank" rel="noopener">QuizPractice — external question practice</a> · <a href="https://quizspacee.com/pyq/dl-genai" target="_blank" rel="noopener">DL/GenAI past-paper practice and exam sets</a></p></section>
  </article>
</main>
<footer class="site-footer">BSDA2001 · Deep Learning and Generative AI · Study notes and practice</footer>
</template>
<script>
import SiteHeader from '../components/SiteHeader.vue';
import CourseSidebar from '../components/CourseSidebar.vue';
export default { components: { SiteHeader, CourseSidebar } };
</script>
