<template>
<SiteHeader page="index" />
  <main class="page-layout">
    <CourseSidebar page="index" />
    <article class="content">
      <div class="page-links">
        <a class="page-link" href="/GAs">Graded Assignment →</a>
        <a class="page-link" href="/week1">Start Week 1: Foundations →</a>
        <a class="page-link" href="/week2">Continue to Week 2: Training &amp; Practice →</a>
        <a class="page-link" href="/week3">Week 3: CNNs →</a>
        <a class="page-link" href="/week4">Week 4: Transfer Learning →</a>
        <a class="page-link" href="/week5">Week 5: Optimization →</a>
        <a class="page-link" href="/week6">Week 6: GANs →</a>
        <a class="page-link" href="/week7">Week 7: RNNs →</a>
        <a class="page-link" href="/week8">Week 8: LSTM &amp; GRU →</a>
        <a class="page-link" href="/week9">Week 9: Attention &amp; NMT →</a>
        <a class="page-link" href="/week10">Week 10: Transformers →</a>
        <a class="page-link" href="/week11">Week 11: Diffusion →</a>
        <a class="page-link" href="/week12">Week 12: ViT, RAG &amp; Fine-tuning →</a>
      </div>
      <section id="how-to-use-these-notes">
        <div>
          <h1>Resources</h1>
          <p><a href="https://drive.google.com/drive/folders/1abmqebDE6PRRRN3XiezVAGDUWoj8NcSa" target="_blank">Live Session Resources</a></p>
          <p><a href="https://drive.google.com/drive/folders/176kW-mbbFM0Ooo7Oga4bJ2EXgUOZQual" target="_blank">lecture slides</a></p>
        </div>
        <span class="label">START HERE</span>
        <h2>How to use these notes</h2>
        <p>Study the pages in course order. Weeks 1–2 cover neural-network foundations, PyTorch, loss, optimization and training. Weeks 3–4 cover CNNs, transfer learning and segmentation. The supplied archives then cover optimization, GANs, RNN/LSTM/GRU sequence models, attention, Transformers, diffusion, Vision Transformers, RAG and parameter-efficient fine-tuning across Weeks 5–12. Each weekly page ends with a question bank and worked answers.</p>
        <div class="note"><b>Course alignment:</b> The IIT Madras BSDA2001 course page describes Week 2 as ANN practice with TensorFlow/Keras, activation functions, and optimization methods. PyTorch examples are included as supplementary framework practice.</div>
        <p><b>Source materials now available:</b> these notes were expanded using the lecture-slide and live-coding archives uploaded for this project. Week 1 draws on the PyTorch introduction, tensor fundamentals, ANN recap, XOR and Fashion-MNIST resources; Week 2 draws on churn prediction, loss/optimisation slides and live coding; Week 3 draws on CNN fundamentals and the CNN live-coding materials; Week 4 now covers the supplied transfer-learning and U-Net segmentation materials. The Week 1 page includes the supplied GA solution sheet and 42-question mock bank. Questions added for Weeks 2–12 are original practice based on the supplied resources, not claimed to be official graded assignments. Use <a href="https://quizpractice.space/" target="_blank" rel="noopener">QuizPractice</a> and the <a href="https://quizspacee.com/pyq/dl-genai" target="_blank" rel="noopener">DL/GenAI past-paper collection</a> for additional practice; full external question sets may require sign-in. Equations use MathJax and may require an internet connection.</p>
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
