<template>
<SiteHeader page="index" />
  <main class="page-layout">
    <CourseSidebar page="index" />
    <article class="content">
      <div class="page-links">
        <a class="page-link" href="/week1">Start Week 1: Foundations →</a>
        <a class="page-link" href="/week2">Continue to Week 2: Training &amp; Practice →</a>
      </div>
      <section id="how-to-use-these-notes">
        <div>
          <h1>Resources</h1>
          <p><a href="https://drive.google.com/drive/folders/1abmqebDE6PRRRN3XiezVAGDUWoj8NcSa" target="_blank">Live Session Resources</a></p>
          <p><a href="https://drive.google.com/drive/folders/176kW-mbbFM0Ooo7Oga4bJ2EXgUOZQual" target="_blank">lecture slides</a></p>
        </div>
        <span class="label">START HERE</span>
        <h2>How to use these notes</h2>
        <p>Study Week 1 first: understand neurons, activations, tensors and the PyTorch workflow. Week 2 develops forward propagation, loss, optimisation, backpropagation and classification practice. Week 3 introduces CNNs for image classification. Week 4 extends that knowledge to transfer learning and pixel-level image segmentation with U-Net.</p>
        <div class="note"><b>Course alignment:</b> The IIT Madras BSDA2001 course page describes Week 2 as ANN practice with TensorFlow/Keras, activation functions, and optimization methods. PyTorch examples are included as supplementary framework practice.</div>
        <p><b>Source materials now available:</b> these notes were expanded using the lecture-slide and live-coding archives uploaded for this project. Week 1 draws on the PyTorch introduction, tensor fundamentals, ANN recap, XOR and Fashion-MNIST resources; Week 2 draws on churn prediction, loss/optimisation slides and live coding; Week 3 draws on CNN fundamentals and the CNN live-coding materials; Week 4 now covers the supplied transfer-learning and U-Net segmentation materials. Week 4 practice questions are additional study questions, not claimed to be official graded-assignment questions. Equations use MathJax and may require an internet connection.</p>
      </section>
      <section id="before-neural-networks-from-machine-learning-to-deep-learning">
        <span class="label">CONTEXT</span>
        <h2>Before neural networks: from machine learning to deep learning</h2>
        <p>To understand why neural networks were developed, first consider the general problem: we have examples and want a computer to learn a rule that works on new examples.</p>
        <h3>Artificial intelligence, machine learning, and deep learning</h3>
        <ul>
          <li><b>Artificial intelligence (AI):</b> the broad field of building systems that perform tasks associated with intelligence.</li>
          <li><b>Machine learning (ML):</b> a part of AI in which a system learns patterns from examples instead of relying only on rules written by a programmer.</li>
          <li><b>Deep learning (DL):</b> a part of ML that uses neural networks with multiple processing layers to learn useful representations from data.</li>
          <li><b>Generative AI:</b> AI that creates new content, such as text, images, audio, or code. It uses many of the deep-learning ideas introduced later in this course.</li>
        </ul>
        <p>For example, a hand-written rule-based spam filter might search for a fixed list of suspicious words. A machine-learning spam filter learns associations from labelled spam and non-spam messages. A deep-learning system can learn more complex patterns from text, sometimes with less manual feature design.</p>
        <h3>Traditional machine learning and feature engineering</h3>
        <p>A <b>feature</b> is a measurable input used by a model, such as house area, number of rooms, or a pixel value. <b>Feature engineering</b> means humans choose or construct useful inputs before model training. In traditional workflows, domain experts may need to design these features carefully.</p>
        <table>
          <tbody>
            <tr><th>Approach</th><th>Typical idea</th><th>Strength / limitation</th></tr>
            <tr><td>Linear models</td><td>Learn a weighted combination of features</td><td>Fast and interpretable, but limited for complex patterns</td></tr>
            <tr><td>Tree-based models</td><td>Learn a sequence of if/then splits</td><td>Powerful for structured/tabular data</td></tr>
            <tr><td>Deep learning</td><td>Learn layers of representations from data</td><td>Useful for complex images, audio, text, and other high-dimensional inputs; often needs more data and computation</td></tr>
          </tbody>
        </table>
        <p>Traditional ML can struggle when raw inputs are very large, such as every pixel in an image, because manually designing the right features is difficult. Deep learning can learn simple features first and combine them into more complex features in later layers. This is called <b>representation learning</b>.</p>
        <div class="note"><b>Connection to the next topic:</b> A neural network is a function that transforms input features into an output. The next sections build this function from its smallest component: a neuron.</div>
      </section>
    </article>
  </main>
  <footer class="site-footer">IIT Madras BS Data Science · Introduction to Deep Learning and Generative AI (BSDA2001)<br>Study the concepts in sequence, work through the equations, and run the code examples to connect theory with practice.</footer>
</template>

<script>
import SiteHeader from '../components/SiteHeader.vue';
import CourseSidebar from '../components/CourseSidebar.vue';

export default {
  components: { SiteHeader, CourseSidebar },
};
</script>
