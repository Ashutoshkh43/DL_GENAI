<template>
<SiteHeader page="week7" />
<main class="page-layout">
  <CourseSidebar page="week7" />
  <article class="content">
    <div class="note"><strong>How to study this page:</strong> Read the explanation, work through the example without looking at the solution, then answer the Questions and Solutions section. This page is built from the supplied Week 7 course resources and expanded with clearly labelled exam-style practice. Practice questions are not claimed to be official graded-assignment questions unless explicitly identified as such.</div>
    <section id="overview"><h2>Sequential data and why order matters</h2>
<p>Sequential data is a series in which order carries information: words in a sentence, daily temperatures, audio frames, or sensor readings. Shuffling the order can destroy meaning. A feed-forward network treats positions as ordinary inputs unless order is explicitly encoded; recurrent networks build order into their computation.</p><p>Common tasks include sequence classification (one label for a whole sequence), sequence labelling (one output per step), forecasting (future values), and sequence generation.</p>
</section>
<section id="rnn"><h2>The recurrent neural network</h2>
<p>An RNN processes one time step at a time and carries a hidden state summarising information from earlier steps. A simple formulation is:</p><div class="eq">\(h_t=\phi(W_xx_t+W_hh_{t-1}+b_h)\)</div><div class="eq">\(y_t=g(W_yh_t+b_y)\)</div><p>Here \(x_t\) is the current input, \(h_{t-1}\) is the previous hidden state, and \(h_t\) is the updated state. The same weight matrices are reused at each time step. This is parameter sharing across time.</p><p>Unrolling an RNN shows repeated copies of the same computation, connected by hidden states. The network can handle variable-length sequences, though batching often requires padding and masks.</p>
</section>
<section id="training"><h2>Backpropagation through time</h2>
<p>Backpropagation through time (BPTT) applies the chain rule through the unrolled recurrent computation. Gradients can pass through many time steps. Repeated multiplication by derivatives can make gradients shrink toward zero (vanishing gradients) or grow very large (exploding gradients), making long-range dependencies difficult to learn.</p><ul><li><strong>Vanishing gradients:</strong> early time steps receive tiny updates, so distant information is hard to learn.</li><li><strong>Exploding gradients:</strong> updates become extremely large; gradient clipping can limit their norm.</li><li><strong>Truncated BPTT:</strong> backpropagates through a limited number of steps to reduce computation and memory.</li></ul>
</section>
<section id="task-types"><h2>Common sequence input/output patterns</h2>
<table><thead><tr><th>Pattern</th><th>Input</th><th>Output</th><th>Example</th></tr></thead><tbody>
<tr><td>One-to-one</td><td>One feature vector</td><td>One output</td><td>Ordinary tabular classification</td></tr>
<tr><td>Many-to-one</td><td>Sequence</td><td>One label/value</td><td>Sentiment of a full review</td></tr>
<tr><td>Many-to-many, aligned</td><td>Sequence</td><td>Output at each step</td><td>Token-level tagging</td></tr>
<tr><td>Encoder-decoder</td><td>Input sequence</td><td>Generated output sequence</td><td>Machine translation</td></tr>
</tbody></table>
<p>In sequence classification, the final hidden state is sometimes used as the summary representation. In sequence labelling, each time step can produce an output. Encoder-decoder models use separate input and output sequences, which need not have the same length.</p></section>
<section id="embeddings"><h2>Text preprocessing and embeddings</h2>
<p>Neural networks consume numbers, not raw words. A typical text pipeline tokenizes text, maps tokens to integer IDs, pads or truncates sequences to a batch length, then maps IDs to dense embedding vectors. Embeddings are learned representations: tokens used in similar contexts can acquire related vectors.</p><p>Padding makes sequence lengths equal for batching, but the model should not treat padding as meaningful content. Use a padding index or mask when the model supports it. Keep the vocabulary and token-to-ID mapping consistent between training and inference.</p>
</section>
<section id="questions"><h2>Week 7 questions and solutions</h2>
<p>Original practice based on the RNN lecture slides and sequence-modelling materials.</p><details class="question"><summary>Q1. Why use an RNN for a sentence rather than simply treating every word as unrelated?</summary><div class="answer"><p><strong>Answer:</strong> An RNN carries a hidden state from earlier tokens.</p><p>The hidden state lets the computation at time t depend on prior inputs and their order.</p></div></details><details class="question"><summary>Q2. In h_t = φ(W_x x_t + W_h h_(t−1) + b), what represents information from earlier time steps?</summary><div class="answer"><p><strong>Answer:</strong> The previous hidden state h_(t−1).</p><p>It is passed into the current recurrence and helps summarize past context.</p></div></details><details class="question"><summary>Q3. What is shared across RNN time steps?</summary><div class="answer"><p><strong>Answer:</strong> The recurrent weight matrices and associated parameters.</p><p>The same parameters are reused at each step, so parameter count does not grow linearly with sequence length.</p></div></details><details class="question"><summary>Q4. What is BPTT?</summary><div class="answer"><p><strong>Answer:</strong> Applying backpropagation through the unrolled sequence over time.</p><p>Gradients flow through the repeated recurrent computations to train shared parameters.</p></div></details><details class="question"><summary>Q5. What is the vanishing-gradient problem?</summary><div class="answer"><p><strong>Answer:</strong> Gradients shrink during backpropagation, weakening learning from distant time steps.</p><p>Repeated derivative factors below one can make the gradient very small for early inputs.</p></div></details><details class="question"><summary>Q6. Which task gives one label for an entire review?</summary><div class="answer"><p><strong>Answer:</strong> Sequence classification.</p><p>The model can use a final hidden state or a pooled representation to predict a review-level sentiment label.</p></div></details><details class="question"><summary>Q7. Why are padding masks useful?</summary><div class="answer"><p><strong>Answer:</strong> They prevent padding tokens from being treated as real sequence content.</p><p>Batches often contain artificial pad IDs that should not affect attention or loss.</p></div></details><details class="question"><summary>Q8. What does an embedding layer do?</summary><div class="answer"><p><strong>Answer:</strong> Maps discrete token IDs to dense learned vectors.</p><p>An integer ID is an index, not a meaningful numeric distance; embeddings provide trainable vector representations.</p></div></details>
</section>

    <section id="sources"><h2>Sources and scope</h2><p>These notes synthesise the supplied Week 7 slides and live-session notebooks. Examples are teaching examples and may simplify code for clarity. Use the linked past-paper resources for additional timed practice; their questions may require sign-in and should be treated as independent practice material.</p><p><a href="https://quizpractice.space/" target="_blank" rel="noopener">QuizPractice — external question practice</a> · <a href="https://quizspacee.com/pyq/dl-genai" target="_blank" rel="noopener">DL/GenAI past-paper practice and exam sets</a></p></section>
  </article>
</main>
<footer class="site-footer">BSDA2001 · Deep Learning and Generative AI · Study notes and practice</footer>
</template>
<script>
import SiteHeader from '../components/SiteHeader.vue';
import CourseSidebar from '../components/CourseSidebar.vue';
export default { components: { SiteHeader, CourseSidebar } };
</script>
