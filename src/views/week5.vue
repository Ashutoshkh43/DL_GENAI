
<template>
  <SiteHeader page="week5" />

  <main class="page-layout">
    <CourseSidebar page="week5" />
    
    <article class="content">
       <a href="https://drive.google.com/drive/folders/1oG9Fz4zO0AL3W7AhN0vcJfxAGPKQEILP" target="_blank">Week 5 slides</a>
       <p><a href="https://colab.research.google.com/drive/1_cvPsGOlGBnzvUGjbRph1dsGl9VTY9np" target="_blank">Gradiant Descent</a></p>
       <a href="https://colab.research.google.com/drive/1r7OFhvvH6dpLalMeYh4QhJMgNyRjTQ07" target="_blank">Advance optimisation</a>
      <h1>Week 5: Optimization Strategies</h1>

      <p class="intro">
        Optimization is the process of finding the model parameters that
        minimize a loss function. This week explains how gradient descent
        works, why optimization can be difficult in deep learning, and how
        advanced optimizers improve training.
      </p>

      <div class="note">
        <strong>Week 5 learning objectives</strong>
        <ul>
          <li>Understand optimization and its challenges in deep learning.</li>
          <li>Differentiate convex and non-convex functions and sets.</li>
          <li>Understand empirical risk and true risk.</li>
          <li>Derive and apply the gradient descent update rule.</li>
          <li>Compare Batch GD, SGD, and Mini-Batch GD.</li>
          <li>Understand Newton's method and learning-rate scheduling.</li>
          <li>Explain Momentum, Nesterov, Adagrad, RMSProp, AdaDelta, Adam and AdamW.</li>
          <li>Implement and compare optimizers using PyTorch.</li>
        </ul>
      </div>

      <hr />

      <h2>1. Introduction to Optimization in Deep Learning</h2>

      <h3>1.1 What is optimization?</h3>

      <p>
        Optimization is the process of finding the best possible values of
        variables to minimize or maximize a mathematical function.
        In deep learning, we generally want to minimize the loss function.
      </p>

      <p>
        A neural network contains parameters such as weights and biases.
        During training, these parameters are repeatedly updated so that
        the predictions become closer to the actual answers.
      </p>

      <p>Mathematically, our objective is:</p>

      <div class="eq">
        θ* = arg min L(θ)
      </div>

      <p>Where:</p>
      <ul>
        <li><strong>θ</strong> represents all model parameters.</li>
        <li><strong>L(θ)</strong> is the loss function.</li>
        <li><strong>θ*</strong> represents the parameters that minimize the loss.</li>
        <li><strong>arg min</strong> means the parameter values at which the function has its minimum.</li>
      </ul>

      <h3>1.2 How optimization is used during training</h3>

      <p>
        Consider a neural network that predicts house prices. Initially,
        its weights may produce inaccurate predictions. We calculate the
        loss between predicted and actual prices, calculate gradients,
        and update the weights.
      </p>

      <ol>
        <li>Initialize the model parameters.</li>
        <li>Pass training data through the model.</li>
        <li>Calculate the loss.</li>
        <li>Calculate gradients using backpropagation.</li>
        <li>Update parameters using an optimizer.</li>
        <li>Repeat until training is complete or a stopping condition is met.</li>
      </ol>

      <div class="note">
        <strong>Important distinction</strong>
        <p>
          Backpropagation calculates the gradients of the loss with respect
          to model parameters. An optimizer uses these gradients to update
          the parameters.
        </p>
        <p>
          Backpropagation tells us how the loss changes. Optimization
          decides how to change the parameters.
        </p>
      </div>

      <h3>1.3 Why should we understand optimizers?</h3>

      <p>
        Optimizers such as SGD and Adam can be used without understanding
        their internal mathematics. However, deeper knowledge is useful
        for three reasons.
      </p>

      <ul>
        <li>
          <strong>Training efficiency:</strong> A better optimization
          algorithm can reduce the time and computational resources
          required to train a model.
        </li>
        <li>
          <strong>Model performance:</strong> Understanding optimizers
          helps us choose suitable hyperparameters and improve training.
        </li>
        <li>
          <strong>Debugging:</strong> It helps identify problems such as
          exploding loss, slow convergence and oscillations.
        </li>
      </ul>

      <h3>1.4 The two goals: Optimization vs. Deep Learning</h3>

      <p>
        Optimization and deep learning have related but different goals.
      </p>

      <table>
        <thead>
          <tr>
            <th>Optimization</th>
            <th>Deep Learning</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Minimizes an objective function.</td>
            <td>Finds a model that performs well on unseen data.</td>
          </tr>
          <tr>
            <td>Focuses on training error.</td>
            <td>Focuses on generalization error.</td>
          </tr>
          <tr>
            <td>Works with the available training data.</td>
            <td>Should perform well on new examples.</td>
          </tr>
        </tbody>
      </table>

      <h3>1.5 Empirical Risk vs. True Risk</h3>

      <p>
        This is an important concept because minimizing training loss
        does not automatically guarantee good performance on unseen data.
      </p>

      <h4>Empirical Risk</h4>

      <p>
        Empirical risk is the average loss calculated over the finite
        training dataset.
      </p>

      <div class="eq">
        R̂(θ) = (1/n) Σᵢ₌₁ⁿ L(f(xᵢ; θ), yᵢ)
      </div>

      <p>Where:</p>
      <ul>
        <li>n is the number of training examples.</li>
        <li>xᵢ is the input of the i-th example.</li>
        <li>yᵢ is its actual output.</li>
        <li>f(xᵢ; θ) is the model prediction.</li>
        <li>L is the loss function.</li>
      </ul>

      <p>
        During normal training, we calculate and minimize empirical risk
        because we only have access to a finite training dataset.
      </p>

      <h4>True Risk</h4>

      <p>
        True risk is the expected loss over the entire underlying
        population or data distribution.
      </p>

      <div class="eq">
        R(θ) = E[(x,y)~P][L(f(x; θ), y)]
      </div>

      <p>
        It measures how well the model is expected to perform on
        data drawn from the actual distribution, including unseen examples.
      </p>

      <h4>Difference between the two</h4>

      <table>
        <thead>
          <tr>
            <th>Empirical Risk</th>
            <th>True Risk</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Calculated using training data.</td>
            <td>Calculated over the entire data distribution.</td>
          </tr>
          <tr>
            <td>Finite dataset.</td>
            <td>Population-level expectation.</td>
          </tr>
          <tr>
            <td>Can be noisy.</td>
            <td>Represents expected generalization performance.</td>
          </tr>
          <tr>
            <td>Directly minimized during training.</td>
            <td>The ultimate quantity we want to minimize.</td>
          </tr>
        </tbody>
      </table>

      <div class="note">
        <strong>Key observation</strong>
        <p>
          The minimum of empirical risk may occur at a different parameter
          value from the minimum of true risk.
        </p>
        <p>
          A model may achieve very low training error but perform poorly
          on unseen data. This is one reason why regularization is important.
        </p>
      </div>

      <h3>1.6 Optimization and Regularization</h3>

      <p>
        Training a deep learning model involves two important aspects:
      </p>

      <p><strong>1. Optimization</strong></p>
      <ul>
        <li>Reduces the training error.</li>
        <li>Uses algorithms such as SGD and Adam.</li>
        <li>Updates the model parameters.</li>
      </ul>

      <p><strong>2. Regularization</strong></p>
      <ul>
        <li>Controls model complexity.</li>
        <li>Helps reduce overfitting.</li>
        <li>Attempts to reduce the gap between training and generalization error.</li>
      </ul>

      <p>Examples of regularization:</p>
      <ul>
        <li>Weight decay.</li>
        <li>Dropout.</li>
        <li>Data augmentation.</li>
      </ul>

      <div class="eq">
        Training = Optimization + Regularization
      </div>

      <h3>1.7 Non-convexity in Deep Learning</h3>

      <p>
        Most deep learning optimization problems are non-convex.
        This means their loss surfaces can contain multiple valleys,
        peaks, flat regions and saddle points.
      </p>

      <p>
        Imagine a ball moving over a mountainous landscape. The goal
        is to reach a low point, but the landscape may contain many
        different valleys and flat areas.
      </p>

      <p>
        This complicated loss surface makes optimization difficult.
      </p>

      <hr />

      <h2>2. Major Optimization Challenges</h2>

      <p>
        The lecture highlights three major challenges:
        local minima, saddle points and vanishing gradients.
      </p>

      <h3>2.1 Local Minima</h3>

      <p>
        A local minimum is a point where the function has a lower value
        than all nearby points.
      </p>

      <p>
        A global minimum is the point where the function has its
        smallest value over the entire domain.
      </p>

      <div class="eq">
        Local minimum: f(x*) ≤ f(x) for nearby x
      </div>

      <div class="eq">
        Global minimum: f(x*) ≤ f(x) for every x in the domain
      </div>

      <p><strong>Example:</strong></p>

      <p>
        Imagine a landscape containing several valleys. A ball rolling
        down the landscape may enter a small valley and stop there,
        even though a deeper valley exists elsewhere.
      </p>

      <p><strong>Why is this a problem?</strong></p>

      <ul>
        <li>Gradient-based optimizers use local gradient information.</li>
        <li>They may converge to a local minimum.</li>
        <li>They may not discover a better solution elsewhere.</li>
      </ul>

      <div class="note">
        A local minimum is not necessarily the best possible solution.
        A global minimum is the best solution over the complete domain.
      </div>

      <h3>2.2 Saddle Points</h3>

      <p>
        A saddle point is a point where the gradient is zero, but the
        point is neither a local minimum nor a local maximum.
      </p>

      <div class="eq">
        ∇f(x) = 0
      </div>

      <p>
        At a saddle point, the function may behave like a minimum in
        one direction and like a maximum in another direction.
      </p>

      <h4>Example 1: One-dimensional function</h4>

      <div class="eq">
        f(x) = x³
      </div>

      <p>First derivative:</p>

      <div class="eq">
        f'(x) = 3x²
      </div>

      <p>Second derivative:</p>

      <div class="eq">
        f''(x) = 6x
      </div>

      <p>At x = 0:</p>

      <div class="eq">
        f'(0) = 0,  f''(0) = 0
      </div>

      <p>
        However, x = 0 is not a minimum or maximum. The function
        continues increasing through the origin.
      </p>

      <h4>Example 2: Two-dimensional function</h4>

      <div class="eq">
        f(x,y) = x² - y²
      </div>

      <p>Partial derivatives:</p>

      <div class="eq">
        ∂f/∂x = 2x
      </div>

      <div class="eq">
        ∂f/∂y = -2y
      </div>

      <p>At (0,0):</p>

      <div class="eq">
        ∇f(0,0) = [0, 0]
      </div>

      <ul>
        <li>Along the x direction, the function behaves like a minimum.</li>
        <li>Along the y direction, the function behaves like a maximum.</li>
      </ul>

      <p>
        Therefore, (0,0) is a saddle point.
      </p>

      <h4>Saddle points and the Hessian</h4>

      <p>
        The Hessian is the matrix of second-order partial derivatives.
        It describes the curvature of a function in different directions.
      </p>

      <div class="eq">
        H = ∇²f(x)
      </div>

      <p>
        At a stationary point:
      </p>

      <ul>
        <li><strong>All eigenvalues positive:</strong> local minimum.</li>
        <li><strong>All eigenvalues negative:</strong> local maximum.</li>
        <li><strong>Positive and negative eigenvalues:</strong> saddle point.</li>
      </ul>

      <p>
        In high-dimensional spaces, saddle points are common because
        there are many directions in which the curvature can differ.
      </p>

      <h3>2.3 Vanishing Gradients</h3>

      <p>
        The vanishing gradient problem occurs when gradients become
        extremely small. As a result, parameter updates become
        negligible and learning becomes very slow.
      </p>

      <p>Recall the gradient descent update:</p>

      <div class="eq">
        θₜ₊₁ = θₜ - η∇L(θₜ)
      </div>

      <p>
        If the gradient is almost zero, the parameter update is also
        almost zero.
      </p>

      <h4>Example: Hyperbolic tangent</h4>

      <div class="eq">
        f(x) = tanh(x)
      </div>

      <p>Its derivative is:</p>

      <div class="eq">
        f'(x) = 1 - tanh²(x)
      </div>

      <p>
        When x = 4, the derivative is approximately 0.0013.
        This is a very small gradient, so updates can become tiny.
      </p>

      <h4>Why does it matter?</h4>

      <ul>
        <li>Learning can become extremely slow.</li>
        <li>Earlier layers of deep networks may receive very small gradients.</li>
        <li>The optimizer may struggle to make meaningful progress.</li>
      </ul>

      <h3>2.4 Summary of optimization challenges</h3>

      <table>
        <thead>
          <tr>
            <th>Challenge</th>
            <th>Meaning</th>
            <th>Effect</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Local minimum</td>
            <td>Minimum in a nearby region.</td>
            <td>May stop before reaching the global minimum.</td>
          </tr>
          <tr>
            <td>Saddle point</td>
            <td>Zero gradient, but neither a minimum nor maximum.</td>
            <td>Optimization may stall.</td>
          </tr>
          <tr>
            <td>Vanishing gradient</td>
            <td>Extremely small gradients.</td>
            <td>Very slow parameter updates.</td>
          </tr>
        </tbody>
      </table>

      <hr />

      <h2>3. A Primer on Convex Optimization</h2>

      <h3>3.1 Why study convex optimization?</h3>

      <p>
        Most deep learning optimization problems are non-convex.
        However, convex optimization is still important for three reasons.
      </p>

      <ol>
        <li>
          <strong>Analytical tractability:</strong> convex problems are
          easier to analyze mathematically.
        </li>
        <li>
          <strong>Algorithm design:</strong> convex problems provide
          simple settings in which optimization algorithms can be tested.
        </li>
        <li>
          <strong>Local properties:</strong> some regions around local
          minima of non-convex functions can have convex-like behaviour.
        </li>
      </ol>

      <h3>3.2 Convex Sets</h3>

      <p>
        A set is convex if, for any two points inside the set, the entire
        straight line segment connecting those points also lies inside
        the set.
      </p>

      <p>Mathematical definition:</p>

      <div class="eq">
        λa + (1 - λ)b ∈ X
      </div>

      <p>Where:</p>

      <ul>
        <li>a and b are any two points in the set X.</li>
        <li>λ is a number between 0 and 1.</li>
        <li>Every point on the line segment must remain inside X.</li>
      </ul>

      <h4>Examples of convex sets</h4>

      <ul>
        <li>A filled circle or disk.</li>
        <li>A square.</li>
        <li>A rectangle.</li>
        <li>A solid convex polygon.</li>
      </ul>

      <h4>Example of a non-convex set</h4>

      <p>
        Consider a crescent-shaped region. We may choose two points
        inside the region whose connecting line passes outside it.
        Therefore, the set is non-convex.
      </p>

      <h3>3.3 Properties of Convex Sets</h3>

      <h4>Property 1: Intersection</h4>

      <p>
        The intersection of two or more convex sets is also convex.
      </p>

      <p>
        If a and b belong to both X and Y, then the line segment joining
        a and b must belong to both sets. Hence, it belongs to X ∩ Y.
      </p>

      <div class="eq">
        X and Y convex ⇒ X ∩ Y convex
      </div>

      <h4>Property 2: Union</h4>

      <p>
        The union of two convex sets is not necessarily convex.
      </p>

      <p>
        For example, consider two separate filled circles. Each circle
        is convex individually. However, their union may not be convex
        because a line segment joining points from the two circles can
        pass through the space between them.
      </p>

      <div class="eq">
        X and Y convex ⇏ X ∪ Y convex
      </div>

      <h3>3.4 Convex Functions</h3>

      <p>
        A function is convex if the line segment connecting any two
        points on its graph lies at or above the graph.
      </p>

      <p>Mathematical definition:</p>

      <div class="eq">
        f(λx + (1-λ)x') ≤ λf(x) + (1-λ)f(x')
      </div>

      <p>For every:</p>

      <ul>
        <li>x and x' in the domain.</li>
        <li>λ between 0 and 1.</li>
      </ul>

      <h4>Example 1: Convex function</h4>

      <div class="eq">
        f(x) = 0.5x²
      </div>

      <p>
        This function is convex because it curves upwards.
      </p>

      <h4>Example 2: Non-convex function</h4>

      <div class="eq">
        g(x) = cos(πx)
      </div>

      <p>
        This function repeatedly changes its curvature, so it is
        non-convex over the real line.
      </p>

      <h4>Example 3: Convex exponential function</h4>

      <div class="eq">
        h(x) = exp(0.5x)
      </div>

      <p>
        Its second derivative is positive everywhere, so it is convex.
      </p>

      <h3>3.5 Important Property: Every Local Minimum Is a Global Minimum</h3>

      <p>
        This is one of the most important properties of convex functions.
      </p>

      <div class="note">
        <strong>Theorem</strong>
        <p>
          For a convex function, every local minimum is also a global minimum.
        </p>
      </div>

      <p><strong>Proof by contradiction:</strong></p>

      <ol>
        <li>Assume x* is a local minimum but not a global minimum.</li>
        <li>
          This means another point x' exists such that
          f(x') is smaller than f(x*).
        </li>
        <li>
          Consider a point z on the line segment between x* and x':
        </li>
      </ol>

      <div class="eq">
        z = λx' + (1-λ)x*
      </div>

      <p>
        Choose a small positive value of λ so that z is very close to x*.
      </p>

      <p>By convexity:</p>

      <div class="eq">
        f(z) ≤ λf(x') + (1-λ)f(x*)
      </div>

      <p>Since f(x') is smaller than f(x*):</p>

      <div class="eq">
        f(z) &lt; f(x*)
      </div>

      <p>
        We have found a point arbitrarily close to x* with a smaller
        function value. This contradicts the assumption that x* is a
        local minimum.
      </p>

      <p>
        Therefore, every local minimum of a convex function must be
        a global minimum.
      </p>

      <h3>3.6 Second Derivative Test for Convexity</h3>

      <p>
        The second derivative tells us how a function curves.
      </p>

      <h4>One-dimensional case</h4>

      <p>
        A twice-differentiable function is convex if its second derivative
        is non-negative everywhere.
      </p>

      <div class="eq">
        f''(x) ≥ 0
      </div>

      <p>
        Intuitively, the function is always curving upwards or remains flat.
      </p>

      <h4>Multidimensional case</h4>

      <p>
        For a function with multiple variables, we use the Hessian matrix.
      </p>

      <div class="eq">
        H = ∇²f(x)
      </div>

      <p>
        A twice-differentiable function is convex if its Hessian is
        positive semidefinite throughout its domain.
      </p>

      <div class="eq">
        zᵀHz ≥ 0 for every vector z
      </div>

      <p>
        Equivalently, all eigenvalues of the Hessian must be non-negative.
      </p>

      <h4>Example</h4>

      <div class="eq">
        f(x) = 1/2 ||x||²
      </div>

      <p>Gradient:</p>

      <div class="eq">
        ∇f(x) = x
      </div>

      <p>Hessian:</p>

      <div class="eq">
        ∇²f(x) = I
      </div>

      <p>
        I is the identity matrix. Its eigenvalues are all equal to 1.
        Therefore, the function is convex.
      </p>

      <h3>3.7 Jensen's Inequality</h3>

      <p>
        Jensen's inequality is an important result in convex analysis.
        It states that the average of the function values is greater
        than or equal to the function evaluated at the average input.
      </p>

      <h4>Discrete form</h4>

      <div class="eq">
        Σᵢ αᵢ f(xᵢ) ≥ f(Σᵢ αᵢxᵢ)
      </div>

      <p>Where:</p>

      <ul>
        <li>αᵢ are non-negative weights.</li>
        <li>The weights sum to 1.</li>
        <li>f is a convex function.</li>
      </ul>

      <h4>Continuous form</h4>

      <div class="eq">
        E[f(X)] ≥ f(E[X])
      </div>

      <p>
        In simple words, applying a convex function and then taking
        the expectation gives a value at least as large as applying
        the function to the expectation.
      </p>

      <h3>3.8 Constrained Optimization</h3>

      <p>
        Sometimes, we cannot choose arbitrary parameter values.
        We must satisfy certain restrictions called constraints.
      </p>

      <p>A general constrained optimization problem is:</p>

      <div class="eq">
        Minimize f(x)
      </div>

      <div class="eq">
        Subject to cᵢ(x) ≤ 0
      </div>

      <p>
        Here, f(x) is the objective function and cᵢ(x) represents
        the constraints.
      </p>

      <p>
        In convex optimization, we commonly consider convex objective
        functions and convex constraints.
      </p>

      <h3>3.9 Three Methods for Handling Constraints</h3>

      <h4>Method 1: Lagrangian</h4>

      <p>
        The Lagrangian method converts a constrained optimization problem
        into a problem involving a new function and additional variables
        called Lagrange multipliers.
      </p>

      <div class="eq">
        L(x, α) = f(x) + Σᵢ αᵢcᵢ(x)
      </div>

      <p>Where:</p>

      <ul>
        <li>f(x) is the original objective.</li>
        <li>cᵢ(x) are the constraints.</li>
        <li>αᵢ are Lagrange multipliers.</li>
        <li>αᵢ must be non-negative for inequality constraints.</li>
      </ul>

      <p>
        The lecture describes the resulting saddle-point problem as
        minimizing with respect to x and maximizing with respect to α.
      </p>

      <div class="eq">
        max₍α ≥ 0₎ min₍x₎ L(x, α)
      </div>

      <p>
        The multipliers can be understood as prices or forces associated
        with constraints. A violated constraint can cause its multiplier
        to increase, pushing the solution towards the feasible region.
      </p>

      <h4>Method 2: Penalty method</h4>

      <p>
        Instead of explicitly solving the constrained problem, we add
        penalty terms to the objective function.
      </p>

      <div class="eq">
        Minimize f(x) + Σᵢ αᵢcᵢ(x)
      </div>

      <p>
        Violating constraints becomes costly because the objective
        includes additional penalty terms.
      </p>

      <p><strong>Connection to weight decay:</strong></p>

      <p>
        Weight decay adds a penalty to the model loss to discourage
        excessively large weights.
      </p>

      <div class="eq">
        L'(w) = L(w) + λ||w||²
      </div>

      <p>
        This is related to constraining the size of the weight vector.
      </p>

      <h4>Method 3: Projection</h4>

      <p>
        Projection methods first take an optimization step and then
        move the result back into the feasible set.
      </p>

      <div class="eq">
        Projₓ(x) = arg min₍x' ∈ X₎ ||x - x'||
      </div>

      <p>
        Projection finds the closest point inside the feasible set
        to the current point.
      </p>

      <div class="note">
        <strong>Convex optimization revision</strong>
        <ul>
          <li>Convex set: the line segment between any two points stays inside.</li>
          <li>Intersection of convex sets: always convex.</li>
          <li>Union of convex sets: not necessarily convex.</li>
          <li>Convex function: chord lies above or on the graph.</li>
          <li>Local minimum of a convex function: also global.</li>
          <li>Second derivative: non-negative in one dimension.</li>
          <li>Hessian: positive semidefinite in multiple dimensions.</li>
          <li>Jensen's inequality: E[f(X)] ≥ f(E[X]).</li>
          <li>Constraint methods: Lagrangian, penalties and projections.</li>
        </ul>
      </div>

      <hr />

      <h2>4. Gradient Descent Algorithms</h2>

      <h3>4.1 What is Gradient Descent?</h3>

      <p>
        Gradient descent is an iterative optimization algorithm that
        minimizes a function by repeatedly moving in the direction
        opposite to its gradient.
      </p>

      <p>
        The gradient indicates the direction of steepest increase.
        Therefore, the negative gradient indicates the direction of
        steepest local decrease.
      </p>

      <h3>4.2 Deriving Gradient Descent using Taylor Expansion</h3>

      <p>
        This derivation explains why the gradient descent algorithm
        moves in the negative-gradient direction.
      </p>

      <p>
        For a small displacement ε, the first-order Taylor expansion is:
      </p>

      <div class="eq">
        f(x + ε) ≈ f(x) + εᵀ∇f(x)
      </div>

      <p>
        We want to make f(x + ε) smaller than f(x).
        Therefore, we want the term εᵀ∇f(x) to be negative.
      </p>

      <p>
        The direction that produces the steepest local decrease is
        opposite to the gradient.
      </p>

      <div class="eq">
        ε = -η∇f(x)
      </div>

      <p>
        Here, η is a positive scalar called the learning rate.
      </p>

      <p>
        Substituting this displacement into the update gives:
      </p>

      <div class="eq">
        xₜ₊₁ = xₜ - η∇f(xₜ)
      </div>

      <div class="note">
        <strong>Important formula</strong>
        <p>
          Gradient descent = Current parameters - Learning rate × Gradient
        </p>
      </div>

      <h3>4.3 Understanding the Learning Rate</h3>

      <p>
        The learning rate controls the size of each parameter update.
      </p>

      <ul>
        <li>
          <strong>Very small learning rate:</strong> the algorithm takes
          tiny steps and convergence becomes slow.
        </li>
        <li>
          <strong>Very large learning rate:</strong> the algorithm may
          overshoot the minimum, oscillate or diverge.
        </li>
        <li>
          <strong>Suitable learning rate:</strong> allows the optimizer
          to make useful progress without excessive instability.
        </li>
      </ul>

      <h3>4.4 One-dimensional Gradient Descent Example</h3>

      <p>Consider the function:</p>

      <div class="eq">
        f(x) = x²
      </div>

      <p>Its derivative is:</p>

      <div class="eq">
        f'(x) = 2x
      </div>

      <p>Therefore, the update rule becomes:</p>

      <div class="eq">
        xₜ₊₁ = xₜ - 2ηxₜ
      </div>

      <p>Suppose:</p>

      <ul>
        <li>Initial value x₀ = 10.</li>
        <li>Learning rate η = 0.2.</li>
      </ul>

      <p>First iteration:</p>

      <div class="eq">
        x₁ = 10 - 0.2(2 × 10) = 6
      </div>

      <p>Second iteration:</p>

      <div class="eq">
        x₂ = 6 - 0.2(2 × 6) = 3.6
      </div>

      <p>Third iteration:</p>

      <div class="eq">
        x₃ = 3.6 - 0.2(2 × 3.6) = 2.16
      </div>

      <table>
        <thead>
          <tr>
            <th>Iteration</th>
            <th>x</th>
            <th>f(x) = x²</th>
          </tr>
        </thead>
        <tbody>
          <tr><td>0</td><td>10</td><td>100</td></tr>
          <tr><td>1</td><td>6</td><td>36</td></tr>
          <tr><td>2</td><td>3.6</td><td>12.96</td></tr>
          <tr><td>3</td><td>2.16</td><td>4.6656</td></tr>
        </tbody>
      </table>

      <p>
        The parameter moves closer to zero, which is the minimum
        of the function.
      </p>

      <h3>4.5 Multivariate Gradient Descent</h3>

      <p>
        In deep learning, we generally optimize many parameters at once.
        Therefore, we use a vector of partial derivatives called the gradient.
      </p>

      <p>Consider:</p>

      <div class="eq">
        f(x₁, x₂) = x₁² + 2x₂²
      </div>

      <p>Partial derivatives:</p>

      <div class="eq">
        ∂f/∂x₁ = 2x₁
      </div>

      <div class="eq">
        ∂f/∂x₂ = 4x₂
      </div>

      <p>Therefore:</p>

      <div class="eq">
        ∇f(x) = [2x₁, 4x₂]ᵀ
      </div>

      <p>Gradient descent updates both coordinates:</p>

      <div class="eq">
        x₁₍ₜ₊₁₎ = x₁₍ₜ₎ - 2ηx₁₍ₜ₎
      </div>

      <div class="eq">
        x₂₍ₜ₊₁₎ = x₂₍ₜ₎ - 4ηx₂₍ₜ₎
      </div>

      <h3>4.6 Newton's Method</h3>

      <p>
        Gradient descent uses first-order information: the gradient.
        Newton's method uses second-order information: the Hessian.
      </p>

      <p>Second-order Taylor expansion:</p>

      <div class="eq">
        f(x + ε) ≈ f(x) + εᵀ∇f(x) + 1/2 εᵀHε
      </div>

      <p>Where:</p>

      <ul>
        <li>∇f(x) is the gradient.</li>
        <li>H is the Hessian matrix.</li>
        <li>ε is the displacement.</li>
      </ul>

      <p>
        To minimize this quadratic approximation, differentiate with
        respect to ε and set the result to zero.
      </p>

      <div class="eq">
        ∇f(x) + Hε = 0
      </div>

      <p>Solving for ε:</p>

      <div class="eq">
        ε = -H⁻¹∇f(x)
      </div>

      <p>Therefore, Newton's update rule is:</p>

      <div class="eq">
        xₜ₊₁ = xₜ - H⁻¹∇f(xₜ)
      </div>

      <h4>Advantages of Newton's method</h4>

      <ul>
        <li>Can converge very quickly on suitable functions.</li>
        <li>Uses curvature information to adjust updates in different directions.</li>
        <li>For a quadratic function with an invertible positive-definite Hessian, the exact Newton step reaches the minimum in one iteration.</li>
      </ul>

      <h4>Disadvantages of Newton's method</h4>

      <ul>
        <li>Requires computing the Hessian matrix.</li>
        <li>Requires solving a system involving the Hessian or computing its inverse.</li>
        <li>For d parameters, the Hessian has d × d entries.</li>
        <li>Storing the Hessian requires O(d²) space.</li>
        <li>Direct inversion can require O(d³) operations.</li>
        <li>For non-convex functions, the Hessian may be indefinite, so the Newton direction may not be a descent direction.</li>
      </ul>

      <div class="note">
        Newton's method can be powerful for smaller optimization problems,
        but its full Hessian computation is generally impractical for
        large deep learning models.
      </div>

      <h3>4.7 Batch Gradient Descent</h3>

      <p>
        In Batch Gradient Descent, the gradient is calculated using
        the entire training dataset before each parameter update.
      </p>

      <p>Suppose the dataset contains n examples:</p>

      <div class="eq">
        f(x) = (1/n) Σᵢ₌₁ⁿ fᵢ(x)
      </div>

      <p>The gradient is:</p>

      <div class="eq">
        ∇f(x) = (1/n) Σᵢ₌₁ⁿ ∇fᵢ(x)
      </div>

      <p>
        The optimizer computes the gradient using every training
        example and then performs one update.
      </p>

      <h4>Advantages</h4>

      <ul>
        <li>Uses the complete dataset for every update.</li>
        <li>Provides a stable gradient estimate.</li>
        <li>Generally produces smoother optimization trajectories.</li>
      </ul>

      <h4>Disadvantages</h4>

      <ul>
        <li>Each update requires processing the complete dataset.</li>
        <li>Computational cost per update grows with the dataset size.</li>
        <li>Can be inefficient for very large datasets.</li>
      </ul>

      <h3>4.8 Stochastic Gradient Descent (SGD)</h3>

      <p>
        Stochastic Gradient Descent uses one randomly selected training
        example to calculate the gradient at each update.
      </p>

      <p>Its update rule is:</p>

      <div class="eq">
        xₜ₊₁ = xₜ - η∇fᵢₜ(xₜ)
      </div>

      <p>
        Here, iₜ is the randomly selected training example.
      </p>

      <h4>Why does SGD work?</h4>

      <p>
        Although a single example does not provide the exact full-data
        gradient, its expected gradient equals the full-data gradient
        when examples are sampled uniformly.
      </p>

      <div class="eq">
        Eᵢ[∇fᵢ(x)] = (1/n)Σᵢ₌₁ⁿ∇fᵢ(x) = ∇f(x)
      </div>

      <p>
        This means the stochastic gradient is an unbiased estimate
        of the full gradient.
      </p>

      <h4>Advantages</h4>

      <ul>
        <li>Very cheap individual updates.</li>
        <li>Can begin learning without processing the entire dataset.</li>
        <li>Gradient noise can sometimes help the optimizer move away from poor regions.</li>
      </ul>

      <h4>Disadvantages</h4>

      <ul>
        <li>Updates are noisy.</li>
        <li>Loss may fluctuate instead of decreasing smoothly.</li>
        <li>May bounce around near the minimum.</li>
        <li>Learning-rate scheduling is important for convergence.</li>
        <li>Individual-example updates do not exploit vectorized hardware as efficiently as mini-batches.</li>
      </ul>

      <h3>4.9 Mini-Batch Gradient Descent</h3>

      <p>
        Mini-Batch Gradient Descent calculates the gradient using a
        small group of training examples instead of the complete
        dataset or just one example.
      </p>

      <p>Suppose the batch size is b:</p>

      <div class="eq">
        ∇fᵦ(x) = (1/b) Σᵢ∈B ∇fᵢ(x)
      </div>

      <p>The update rule is:</p>

      <div class="eq">
        xₜ₊₁ = xₜ - η∇fᵦ(xₜ)
      </div>

      <h4>Advantages</h4>

      <ul>
        <li>Faster than one-by-one SGD in many practical settings because it uses vectorized operations.</li>
        <li>Less noisy than single-example SGD.</li>
        <li>Works efficiently with GPUs and parallel hardware.</li>
        <li>Balances gradient stability and computational efficiency.</li>
      </ul>

      <h4>Why is vectorization important?</h4>

      <p>
        Modern CPUs and GPUs are designed to perform many operations
        in parallel. Mini-batch training allows a group of examples
        to be processed together using matrix operations.
      </p>

      <p>
        Processing individual examples separately can involve many
        small operations. Processing a mini-batch allows larger,
        more efficient operations.
      </p>

      <h3>4.10 Comparison of Gradient Descent Variants</h3>

      <table>
        <thead>
          <tr>
            <th>Feature</th>
            <th>Batch GD</th>
            <th>SGD</th>
            <th>Mini-Batch GD</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Examples per update</td>
            <td>All examples</td>
            <td>One example</td>
            <td>Small group</td>
          </tr>
          <tr>
            <td>Gradient estimate</td>
            <td>Full-data gradient</td>
            <td>Noisy estimate</td>
            <td>Intermediate estimate</td>
          </tr>
          <tr>
            <td>Update cost</td>
            <td>High</td>
            <td>Low</td>
            <td>Moderate</td>
          </tr>
          <tr>
            <td>Stability</td>
            <td>High</td>
            <td>Low</td>
            <td>Moderate to high</td>
          </tr>
          <tr>
            <td>Vectorization</td>
            <td>Good</td>
            <td>Limited</td>
            <td>Good</td>
          </tr>
          <tr>
            <td>Practical use</td>
            <td>Smaller datasets or problems</td>
            <td>Online learning</td>
            <td>Common deep learning training</td>
          </tr>
        </tbody>
      </table>

      <div class="note">
        <strong>Important exam point</strong>
        <p>
          Mini-Batch SGD is commonly used in deep learning because
          it balances the statistical efficiency of averaging gradients
          with the computational efficiency of vectorized operations.
        </p>
      </div>

      <hr />

      <h2>5. Learning Rate Scheduling</h2>

      <h3>5.1 What is a learning-rate schedule?</h3>

      <p>
        A learning-rate schedule changes the learning rate during
        training instead of keeping it constant.
      </p>

      <p>
        The learning rate controls how large each parameter update is.
        Its value can have a major impact on training stability and speed.
      </p>

      <h3>5.2 Why do we need learning-rate scheduling?</h3>

      <p><strong>Reason 1: Avoid divergence</strong></p>

      <p>
        A learning rate that is too large can cause the optimizer
        to overshoot the minimum or diverge.
      </p>

      <p><strong>Reason 2: Improve convergence</strong></p>

      <p>
        As the model approaches a minimum, smaller updates can help
        it settle near the solution instead of continuously overshooting.
      </p>

      <p><strong>Reason 3: Warm-up</strong></p>

      <p>
        At the beginning of training, model parameters may be randomly
        initialized. Starting immediately with a large learning rate
        can produce unstable updates. Warm-up gradually increases
        the learning rate at the beginning.
      </p>

      <h3>5.3 Common Learning-Rate Schedules</h3>

      <h4>1. Piecewise Constant Schedule</h4>

      <p>
        The learning rate remains constant for a specified number
        of training steps or epochs and is then changed.
      </p>

      <div class="eq">
        η(t) = ηᵢ when tᵢ ≤ t &lt; tᵢ₊₁
      </div>

      <p>
        Example: Reduce the learning rate by a factor of 10 every
        30 epochs.
      </p>

      <h4>2. Exponential Decay</h4>

      <p>
        The learning rate decreases exponentially over time.
      </p>

      <div class="eq">
        η(t) = η₀e⁻λᵗ
      </div>

      <p>Where:</p>

      <ul>
        <li>η₀ is the initial learning rate.</li>
        <li>λ controls the decay speed.</li>
        <li>t is the training step.</li>
      </ul>

      <h4>3. Polynomial Decay</h4>

      <p>
        The learning rate decreases according to a polynomial expression.
      </p>

      <div class="eq">
        η(t) = η₀(βt + 1)⁻ᵅ
      </div>

      <p>
        A common choice is α = 0.5, which produces a decay rate
        proportional to 1/√t.
      </p>

      <h4>4. Cosine Annealing</h4>

      <p>
        The learning rate decreases following a cosine-shaped curve.
        It begins relatively high and gradually approaches a smaller value.
      </p>

      <div class="eq">
        η(t) = ηmin + 1/2(ηmax - ηmin)(1 + cos(πt/T))
      </div>

      <p>
        Here T is the schedule duration, while ηmax and ηmin
        represent the maximum and minimum learning rates.
      </p>

      <h4>5. Warm-up</h4>

      <p>
        Warm-up gradually increases the learning rate during the
        initial training steps.
      </p>

      <p>
        A simple linear warm-up schedule is:
      </p>

      <div class="eq">
        η(t) = ηmax × t/Twarmup
      </div>

      <p>
        After warm-up, another schedule such as cosine decay can be used.
      </p>

      <h4>6. Reduce on Plateau</h4>

      <p>
        This schedule monitors a metric such as validation loss.
        If the metric stops improving for a specified number of epochs,
        the learning rate is reduced.
      </p>

      <h3>5.4 Comparison of schedules</h3>

      <table>
        <thead>
          <tr>
            <th>Schedule</th>
            <th>How it works</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Piecewise constant</td>
            <td>Changes the learning rate at predefined intervals.</td>
          </tr>
          <tr>
            <td>Exponential decay</td>
            <td>Decreases the learning rate exponentially.</td>
          </tr>
          <tr>
            <td>Polynomial decay</td>
            <td>Decreases the learning rate according to a polynomial rule.</td>
          </tr>
          <tr>
            <td>Cosine annealing</td>
            <td>Follows a cosine-shaped decay.</td>
          </tr>
          <tr>
            <td>Warm-up</td>
            <td>Gradually increases the learning rate at the start.</td>
          </tr>
          <tr>
            <td>Reduce on plateau</td>
            <td>Reduces the learning rate when progress stops.</td>
          </tr>
        </tbody>
      </table>

      <hr />

      <h2>6. Accelerated Optimization Methods</h2>

      <h3>6.1 The problem with ordinary Gradient Descent</h3>

      <p>
        Ordinary gradient descent can struggle when the loss function
        has very different curvature in different directions.
      </p>

      <p>Consider:</p>

      <div class="eq">
        f(x₁,x₂) = 0.1x₁² + 2x₂²
      </div>

      <p>
        The function changes much more rapidly in the x₂ direction
        than in the x₁ direction.
      </p>

      <p>
        A large learning rate may cause divergence in the steep
        direction, while a small learning rate may make progress
        very slow in the flatter direction.
      </p>

      <p>
        This can produce a zigzag or oscillating optimization path.
      </p>

      <h3>6.2 Momentum</h3>

      <p>
        Momentum improves gradient descent by accumulating information
        from previous gradients.
      </p>

      <p>
        Imagine a ball rolling down a hill. As it continues moving
        in the same direction, it builds up speed.
      </p>

      <p>
        Momentum uses a similar idea: it maintains a velocity vector
        that remembers previous gradients.
      </p>

      <h4>Mathematical formulation</h4>

      <div class="eq">
        vₜ = βvₜ₋₁ + gₜ
      </div>

      <div class="eq">
        θₜ₊₁ = θₜ - ηvₜ
      </div>

      <p>Where:</p>

      <ul>
        <li>vₜ is the velocity vector.</li>
        <li>β is the momentum coefficient.</li>
        <li>gₜ is the current gradient.</li>
        <li>η is the learning rate.</li>
      </ul>

      <h4>Understanding the momentum coefficient</h4>

      <p>
        The momentum coefficient controls how much previous gradients
        influence the current update.
      </p>

      <ul>
        <li>β = 0 means no momentum.</li>
        <li>A larger β gives more influence to past gradients.</li>
        <li>β = 0.9 is a common value.</li>
      </ul>

      <h4>Momentum as a weighted history of gradients</h4>

      <p>Expanding the recurrence:</p>

      <div class="eq">
        vₜ = βvₜ₋₁ + gₜ
      </div>

      <div class="eq">
        vₜ = β²vₜ₋₂ + βgₜ₋₁ + gₜ
      </div>

      <p>Continuing this expansion:</p>

      <div class="eq">
        vₜ = Σₖ₌₀ᵗ βᵏgₜ₋ₖ
      </div>

      <p>
        Therefore, momentum is a weighted sum of past gradients.
        Recent gradients receive more weight, while older gradients
        receive progressively less weight.
      </p>

      <h4>Advantages of Momentum</h4>

      <ul>
        <li>Accelerates movement in consistent directions.</li>
        <li>Reduces oscillations in steep directions.</li>
        <li>Can improve convergence speed.</li>
        <li>Helps navigate elongated valleys.</li>
      </ul>

      <h3>6.3 Nesterov Accelerated Gradient (NAG)</h3>

      <p>
        Nesterov momentum is a variation of classical momentum.
        Its main idea is to look ahead before calculating the gradient.
      </p>

      <p>
        Classical momentum calculates the gradient at the current
        parameter position.
      </p>

      <p>
        Nesterov momentum estimates where the momentum update will
        take the parameters and calculates the gradient at that
        look-ahead position.
      </p>

      <h4>Mathematical formulation</h4>

      <div class="eq">
        vₜ = βvₜ₋₁ + ∇J(θₜ - ηβvₜ₋₁)
      </div>

      <div class="eq">
        θₜ₊₁ = θₜ - ηvₜ
      </div>

      <h4>Difference between Momentum and Nesterov</h4>

      <table>
        <thead>
          <tr>
            <th>Momentum</th>
            <th>Nesterov</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Calculates gradient at the current position.</td>
            <td>Calculates gradient at a look-ahead position.</td>
          </tr>
          <tr>
            <td>Uses accumulated velocity.</td>
            <td>Uses accumulated velocity and anticipates the next position.</td>
          </tr>
          <tr>
            <td>May react after moving towards a region.</td>
            <td>Can adjust the update using the anticipated position.</td>
          </tr>
        </tbody>
      </table>

      <h3>6.4 Adagrad</h3>

      <p>
        Adagrad stands for Adaptive Gradient Algorithm.
        It adapts the learning rate separately for each parameter
        based on its historical gradients.
      </p>

      <p>
        This is particularly useful when some parameters receive
        frequent updates while others receive infrequent updates,
        such as in sparse-feature problems.
      </p>

      <h4>Mathematical formulation</h4>

      <p>First, accumulate squared gradients:</p>

      <div class="eq">
        sₜ = sₜ₋₁ + gₜ ⊙ gₜ
      </div>

      <p>Then update the parameters:</p>

      <div class="eq">
        θₜ₊₁ = θₜ - ηgₜ/(√sₜ + ε)
      </div>

      <p>
        The division is element-wise. ε is a small constant
        used for numerical stability.
      </p>

      <h4>How does Adagrad work?</h4>

      <ul>
        <li>
          Parameters with large historical gradients accumulate
          larger squared-gradient values.
        </li>
        <li>
          Their effective learning rates decrease more quickly.
        </li>
        <li>
          Parameters with infrequent or small gradients retain
          relatively larger effective learning rates.
        </li>
      </ul>

      <h4>Advantages</h4>

      <ul>
        <li>Automatically adjusts learning rates for individual parameters.</li>
        <li>Useful for sparse data and infrequently updated features.</li>
        <li>Can help handle differently scaled gradients.</li>
      </ul>

      <h4>Disadvantage</h4>

      <p>
        Adagrad keeps accumulating squared gradients throughout training.
        The accumulator continually grows, so the effective learning
        rate can eventually become extremely small.
      </p>

      <h3>6.5 RMSProp</h3>

      <p>
        RMSProp addresses Adagrad's problem of continuously decreasing
        learning rates.
      </p>

      <p>
        Instead of accumulating every squared gradient from the beginning,
        RMSProp uses an exponentially weighted moving average of squared
        gradients.
      </p>

      <h4>Mathematical formulation</h4>

      <p>Update the squared-gradient average:</p>

      <div class="eq">
        sₜ = γsₜ₋₁ + (1-γ)(gₜ ⊙ gₜ)
      </div>

      <p>Update the parameters:</p>

      <div class="eq">
        θₜ₊₁ = θₜ - ηgₜ/(√sₜ + ε)
      </div>

      <p>Where:</p>

      <ul>
        <li>γ is the decay rate.</li>
        <li>sₜ is the moving average of squared gradients.</li>
        <li>ε prevents division by zero.</li>
      </ul>

      <h4>Why is RMSProp better than Adagrad in this respect?</h4>

      <p>
        Adagrad remembers the entire history of squared gradients.
        RMSProp uses a moving average, allowing older gradients to
        gradually lose their influence.
      </p>

      <h3>6.6 AdaDelta</h3>

      <p>
        AdaDelta is another adaptive optimization method designed
        to address the continuously decreasing learning rate problem.
      </p>

      <p>
        Its main idea is to adapt the update scale using information
        about past parameter updates, reducing the need for a manually
        selected global learning rate.
      </p>

      <h4>Two state variables</h4>

      <ol>
        <li>
          A moving average of squared gradients.
        </li>
        <li>
          A moving average of squared parameter updates.
        </li>
      </ol>

      <h4>Mathematical formulation</h4>

      <p>First, update the squared-gradient average:</p>

      <div class="eq">
        sₜ = ρsₜ₋₁ + (1-ρ)gₜ²
      </div>

      <p>Calculate the update:</p>

      <div class="eq">
        Δθₜ = -[√(E[Δθ²]ₜ₋₁ + ε)/√(sₜ + ε)]gₜ
      </div>

      <p>Update the squared-parameter-update average:</p>

      <div class="eq">
        E[Δθ²]ₜ = ρE[Δθ²]ₜ₋₁ + (1-ρ)Δθₜ²
      </div>

      <p>
        The update scale is adjusted using the ratio of the moving
        averages of parameter updates and gradients.
      </p>

      <h3>6.7 Adam: Adaptive Moment Estimation</h3>

      <p>
        Adam combines ideas from Momentum and RMSProp.
        It is one of the most commonly used optimization algorithms
        in deep learning.
      </p>

      <p>Adam maintains two moving averages:</p>

      <ul>
        <li>
          First moment: moving average of gradients, similar to Momentum.
        </li>
        <li>
          Second moment: moving average of squared gradients, similar to RMSProp.
        </li>
      </ul>

      <h4>Step 1: Calculate the gradient</h4>

      <div class="eq">
        gₜ = ∇J(θₜ)
      </div>

      <h4>Step 2: Update the first moment</h4>

      <div class="eq">
        mₜ = β₁mₜ₋₁ + (1-β₁)gₜ
      </div>

      <h4>Step 3: Update the second moment</h4>

      <div class="eq">
        vₜ = β₂vₜ₋₁ + (1-β₂)gₜ²
      </div>

      <h4>Step 4: Bias correction</h4>

      <p>
        Adam initializes its moving averages at zero. During the
        early iterations, these estimates can be biased towards zero.
        Bias correction compensates for this effect.
      </p>

      <div class="eq">
        m̂ₜ = mₜ/(1-β₁ᵗ)
      </div>

      <div class="eq">
        v̂ₜ = vₜ/(1-β₂ᵗ)
      </div>

      <h4>Step 5: Update parameters</h4>

      <div class="eq">
        θₜ₊₁ = θₜ - ηm̂ₜ/(√v̂ₜ + ε)
      </div>

      <h4>Common Adam parameters</h4>

      <ul>
        <li>Learning rate η: commonly 0.001 as a starting point.</li>
        <li>β₁: commonly 0.9.</li>
        <li>β₂: commonly 0.999.</li>
        <li>ε: commonly 10⁻⁸.</li>
      </ul>

      <h3>6.8 AdamW</h3>

      <p>
        AdamW is a variation of Adam that uses decoupled weight decay.
        It addresses the interaction between L2 regularization and
        Adam's adaptive gradient update.
      </p>

      <h4>What is the issue with ordinary Adam and L2 regularization?</h4>

      <p>
        In ordinary Adam with an L2 penalty, the regularization term
        is added to the gradient:
      </p>

      <div class="eq">
        gₜ = ∇J(θₜ) + λθₜ
      </div>

      <p>
        This combined gradient is then processed by Adam's moment
        calculations.
      </p>

      <p>
        AdamW decouples weight decay from the gradient-based adaptive
        update.
      </p>

      <p>A simplified AdamW update is:</p>

      <div class="eq">
        θₜ₊₁ = θₜ - η[m̂ₜ/(√v̂ₜ + ε) + λθₜ]
      </div>

      <p>
        The weight-decay contribution is applied separately from
        the gradient moment calculations.
      </p>

      <h3>6.9 Comparison of Advanced Optimizers</h3>

      <table>
        <thead>
          <tr>
            <th>Optimizer</th>
            <th>Main idea</th>
            <th>Important feature</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Momentum</td>
            <td>Uses past gradients.</td>
            <td>Accelerates consistent directions.</td>
          </tr>
          <tr>
            <td>Nesterov</td>
            <td>Looks ahead before calculating the gradient.</td>
            <td>Anticipates the next position.</td>
          </tr>
          <tr>
            <td>Adagrad</td>
            <td>Accumulates squared gradients.</td>
            <td>Adaptive learning rate per parameter.</td>
          </tr>
          <tr>
            <td>RMSProp</td>
            <td>Moving average of squared gradients.</td>
            <td>Addresses Adagrad's aggressive decay.</td>
          </tr>
          <tr>
            <td>AdaDelta</td>
            <td>Uses moving averages of gradients and updates.</td>
            <td>Adapts update scale.</td>
          </tr>
          <tr>
            <td>Adam</td>
            <td>Combines Momentum and RMSProp.</td>
            <td>First and second moment estimates.</td>
          </tr>
          <tr>
            <td>AdamW</td>
            <td>Adam with decoupled weight decay.</td>
            <td>Separates weight decay from adaptive gradient calculations.</td>
          </tr>
        </tbody>
      </table>

      <hr />

      <h2>7. Practical Implementation Using PyTorch</h2>

      <h3>7.1 Basic training loop</h3>

      <p>
        PyTorch provides optimizers through the <code>torch.optim</code>
        module.
      </p>

      <p>A typical training loop contains the following steps:</p>

      <ol>
        <li>Clear old gradients using <code>zero_grad()</code>.</li>
        <li>Calculate predictions using the forward pass.</li>
        <li>Calculate the loss.</li>
        <li>Calculate gradients using <code>backward()</code>.</li>
        <li>Update model parameters using <code>step()</code>.</li>
      </ol>

      <pre><code>import torch
import torch.nn as nn
import torch.optim as optim

# Create a simple neural network
model = nn.Linear(2, 1)

# Define loss function
criterion = nn.MSELoss()

# Define optimizer
optimizer = optim.SGD(model.parameters(), lr=0.01)

# Sample input and target
X = torch.tensor([[1.0, 2.0],
                  [3.0, 4.0]])

y = torch.tensor([[5.0],
                  [9.0]])

# Training step
optimizer.zero_grad()

# Forward pass
predictions = model(X)

# Calculate loss
loss = criterion(predictions, y)

# Backward pass
loss.backward()

# Update parameters
optimizer.step()</code></pre>

      <h3>7.2 Understanding important PyTorch functions</h3>

      <table>
        <thead>
          <tr>
            <th>Function</th>
            <th>Purpose</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><code>model(X)</code></td>
            <td>Performs the forward pass.</td>
          </tr>
          <tr>
            <td><code>criterion()</code></td>
            <td>Calculates the loss.</td>
          </tr>
          <tr>
            <td><code>optimizer.zero_grad()</code></td>
            <td>Clears gradients from the previous step.</td>
          </tr>
          <tr>
            <td><code>loss.backward()</code></td>
            <td>Calculates gradients using automatic differentiation.</td>
          </tr>
          <tr>
            <td><code>optimizer.step()</code></td>
            <td>Updates model parameters.</td>
          </tr>
        </tbody>
      </table>

      <h3>7.3 PyTorch optimizer examples</h3>

      <pre><code># Vanilla SGD
optimizer = optim.SGD(
    model.parameters(),
    lr=0.01
)

# SGD with Momentum
optimizer = optim.SGD(
    model.parameters(),
    lr=0.01,
    momentum=0.9
)

# SGD with Nesterov
optimizer = optim.SGD(
    model.parameters(),
    lr=0.01,
    momentum=0.9,
    nesterov=True
)

# Adagrad
optimizer = optim.Adagrad(
    model.parameters(),
    lr=0.01
)

# RMSProp
optimizer = optim.RMSprop(
    model.parameters(),
    lr=0.001
)

# Adadelta
optimizer = optim.Adadelta(
    model.parameters(),
    rho=0.95
)

# Adam
optimizer = optim.Adam(
    model.parameters(),
    lr=0.001
)

# AdamW
optimizer = optim.AdamW(
    model.parameters(),
    lr=0.001,
    weight_decay=0.01
)</code></pre>

      <h3>7.4 Learning-rate scheduler in PyTorch</h3>

      <p>
        PyTorch provides learning-rate schedulers that can be used
        alongside optimizers.
      </p>

      <pre><code>optimizer = optim.Adam(
    model.parameters(),
    lr=0.001
)

scheduler = optim.lr_scheduler.StepLR(
    optimizer,
    step_size=10,
    gamma=0.1
)

for epoch in range(50):
    optimizer.zero_grad()

    output = model(X)
    loss = criterion(output, y)

    loss.backward()
    optimizer.step()

    scheduler.step()</code></pre>

      <p>
        Here, the learning rate is multiplied by 0.1 after every
        10 scheduler steps.
      </p>

      <h3>7.5 Gradient clipping</h3>

      <p>
        Gradient clipping limits the size of gradients before
        the optimizer updates parameters. It can help prevent
        excessively large updates.
      </p>

      <pre><code>loss.backward()

torch.nn.utils.clip_grad_norm_(
    model.parameters(),
    max_norm=1.0
)

optimizer.step()</code></pre>

      <h3>7.6 Demonstrating optimizer comparisons</h3>

      <p>
        The Advanced Optimization notebook compares optimizers on
        functions such as the Rosenbrock function, Beale function
        and a quadratic function.
      </p>

      <p>
        It also demonstrates optimizer behaviour on a nonlinear
        classification dataset containing concentric circles.
      </p>

      <p>
        The neural network in the experiment uses multiple hidden
        layers with ReLU activations and Batch Normalization.
        Different optimizers are compared using training loss,
        test loss, training accuracy and test accuracy.
      </p>

      <p>
        The important lesson is that optimizers should be compared
        using both optimization behaviour and generalization performance.
        A lower training loss alone does not prove that an optimizer
        produces a better model.
      </p>

      <hr />

      <h2>8. Optimizer Selection and Best Practices</h2>

      <h3>8.1 General optimizer selection</h3>

      <table>
        <thead>
          <tr>
            <th>Scenario</th>
            <th>Possible choice</th>
            <th>Reason</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>General deep learning</td>
            <td>Adam or AdamW</td>
            <td>Adaptive updates and convenient starting point.</td>
          </tr>
          <tr>
            <td>Computer vision</td>
            <td>SGD with Momentum or AdamW</td>
            <td>Both are commonly used approaches.</td>
          </tr>
          <tr>
            <td>Natural language processing</td>
            <td>Adam or AdamW</td>
            <td>Adaptive learning rates can be useful.</td>
          </tr>
          <tr>
            <td>Sparse features</td>
            <td>Adagrad</td>
            <td>Adapts updates for infrequently occurring features.</td>
          </tr>
          <tr>
            <td>Fine-tuning pretrained models</td>
            <td>AdamW with a low learning rate</td>
            <td>Allows smaller parameter updates.</td>
          </tr>
          <tr>
            <td>Memory constrained training</td>
            <td>Vanilla SGD</td>
            <td>Has relatively low optimizer-state memory overhead.</td>
          </tr>
        </tbody>
      </table>

      <h3>8.2 Learning-rate starting points</h3>

      <p>
        The following values are starting points from the practical
        optimization notebook, not universal rules.
      </p>

      <table>
        <thead>
          <tr>
            <th>Optimizer</th>
            <th>Typical range</th>
            <th>Starting point</th>
          </tr>
        </thead>
        <tbody>
          <tr><td>Vanilla GD</td><td>0.001–0.1</td><td>0.01</td></tr>
          <tr><td>Momentum</td><td>0.001–0.1</td><td>0.01</td></tr>
          <tr><td>Adagrad</td><td>0.01–1.0</td><td>0.1</td></tr>
          <tr><td>RMSProp</td><td>0.0001–0.01</td><td>0.001</td></tr>
          <tr><td>AdaDelta</td><td>Adaptive</td><td>Default settings</td></tr>
          <tr><td>Adam</td><td>0.0001–0.01</td><td>0.001</td></tr>
          <tr><td>AdamW</td><td>0.0001–0.01</td><td>0.001</td></tr>
        </tbody>
      </table>

      <h3>8.3 Common training problems and solutions</h3>

      <table>
        <thead>
          <tr>
            <th>Problem</th>
            <th>Possible cause</th>
            <th>Possible solution</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Training loss does not decrease</td>
            <td>Learning rate too small or unsuitable initialization.</td>
            <td>Check the learning rate and initialization.</td>
          </tr>
          <tr>
            <td>Loss explodes</td>
            <td>Learning rate too large.</td>
            <td>Reduce learning rate or use gradient clipping.</td>
          </tr>
          <tr>
            <td>Slow convergence</td>
            <td>Unsuitable optimizer or learning rate.</td>
            <td>Try an appropriate optimizer and schedule.</td>
          </tr>
          <tr>
            <td>Overfitting</td>
            <td>Insufficient regularization.</td>
            <td>Consider dropout, weight decay or data augmentation.</td>
          </tr>
          <tr>
            <td>Oscillating loss</td>
            <td>Learning rate too high.</td>
            <td>Reduce the learning rate or use momentum.</td>
          </tr>
          <tr>
            <td>Poor generalization</td>
            <td>Model overfitting or unsuitable regularization.</td>
            <td>Monitor validation performance and adjust regularization.</td>
          </tr>
        </tbody>
      </table>

      <hr />

      <h2>9. Complete Week 5 Formula Sheet</h2>

      <table>
        <thead>
          <tr>
            <th>Concept</th>
            <th>Formula</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Empirical risk</td>
            <td>R̂(θ) = (1/n)ΣLᵢ(θ)</td>
          </tr>
          <tr>
            <td>Convex function</td>
            <td>f(λx+(1-λ)y) ≤ λf(x)+(1-λ)f(y)</td>
          </tr>
          <tr>
            <td>Second derivative condition</td>
            <td>f''(x) ≥ 0</td>
          </tr>
          <tr>
            <td>Hessian condition</td>
            <td>H positive semidefinite</td>
          </tr>
          <tr>
            <td>Jensen's inequality</td>
            <td>E[f(X)] ≥ f(E[X])</td>
          </tr>
          <tr>
            <td>Gradient descent</td>
            <td>θₜ₊₁ = θₜ - ηgₜ</td>
          </tr>
          <tr>
            <td>Newton's method</td>
            <td>θₜ₊₁ = θₜ - H⁻¹gₜ</td>
          </tr>
          <tr>
            <td>Momentum</td>
            <td>vₜ = βvₜ₋₁ + gₜ</td>
          </tr>
          <tr>
            <td>Adagrad</td>
            <td>sₜ = sₜ₋₁ + gₜ²</td>
          </tr>
          <tr>
            <td>RMSProp</td>
            <td>sₜ = γsₜ₋₁ + (1-γ)gₜ²</td>
          </tr>
          <tr>
            <td>AdaDelta</td>
            <td>Uses moving averages of squared gradients and updates.</td>
          </tr>
          <tr>
            <td>Adam first moment</td>
            <td>mₜ = β₁mₜ₋₁ + (1-β₁)gₜ</td>
          </tr>
          <tr>
            <td>Adam second moment</td>
            <td>vₜ = β₂vₜ₋₁ + (1-β₂)gₜ²</td>
          </tr>
          <tr>
            <td>Adam bias correction</td>
            <td>m̂ₜ = mₜ/(1-β₁ᵗ), v̂ₜ = vₜ/(1-β₂ᵗ)</td>
          </tr>
        </tbody>
      </table>

      <hr />

      <h2>10. Practice Questions</h2>

      <p>
        These are additional original revision questions based on
        the lecture topics. They are not presented as the official
        Week 5 graded assignment.
      </p>

      <details class="question">
        <summary>Q1. What is the main objective of optimization in deep learning?</summary>
        <p>
          To find model parameters that minimize the objective or
          loss function, usually the empirical risk calculated
          using the training dataset.
        </p>
      </details>

      <details class="question">
        <summary>Q2. What is the difference between empirical risk and true risk?</summary>
        <p>
          Empirical risk is the average loss on a finite training dataset.
          True risk is the expected loss over the underlying data distribution.
        </p>
      </details>

      <details class="question">
        <summary>Q3. Why is minimizing training error not sufficient?</summary>
        <p>
          Because a model can overfit the training data and perform
          poorly on unseen data. The ultimate goal is good generalization.
        </p>
      </details>

      <details class="question">
        <summary>Q4. What are the three major optimization challenges covered in the lecture?</summary>
        <p>
          Local minima, saddle points and vanishing gradients.
        </p>
      </details>

      <details class="question">
        <summary>Q5. What is a saddle point?</summary>
        <p>
          A point where the gradient is zero but the point is neither
          a local minimum nor a local maximum.
        </p>
      </details>

      <details class="question">
        <summary>Q6. What is the condition for a one-dimensional function to be convex?</summary>
        <p>
          For a twice-differentiable function, its second derivative
          must be non-negative everywhere: f''(x) ≥ 0.
        </p>
      </details>

      <details class="question">
        <summary>Q7. Is the union of two convex sets always convex?</summary>
        <p>
          No. The union of two convex sets is not necessarily convex.
        </p>
      </details>

      <details class="question">
        <summary>Q8. State Jensen's inequality.</summary>
        <p>
          For a convex function f, E[f(X)] ≥ f(E[X]).
        </p>
      </details>

      <details class="question">
        <summary>Q9. What is the difference between a local and global minimum?</summary>
        <p>
          A local minimum is the minimum in a nearby region.
          A global minimum is the minimum over the entire domain.
        </p>
      </details>

      <details class="question">
        <summary>Q10. Why does a convex function have no suboptimal local minima?</summary>
        <p>
          For a convex function, every local minimum is also a global
          minimum because of the convexity inequality.
        </p>
      </details>

      <details class="question">
        <summary>Q11. What is the gradient descent update rule?</summary>
        <p>
          θₜ₊₁ = θₜ - η∇L(θₜ).
        </p>
      </details>

      <details class="question">
        <summary>Q12. What happens if the learning rate is too large?</summary>
        <p>
          The optimizer may overshoot the minimum, oscillate or diverge.
        </p>
      </details>

      <details class="question">
        <summary>Q13. What is the main difference between Batch GD and SGD?</summary>
        <p>
          Batch GD calculates its gradient using the entire dataset,
          whereas SGD uses one randomly selected example.
        </p>
      </details>

      <details class="question">
        <summary>Q14. Why is mini-batch gradient descent widely used?</summary>
        <p>
          It balances gradient stability and computational efficiency
          and makes good use of parallel hardware.
        </p>
      </details>

      <details class="question">
        <summary>Q15. Why is the stochastic gradient called an unbiased estimate?</summary>
        <p>
          Because its expected value, under uniform sampling, equals
          the full-data gradient.
        </p>
      </details>

      <details class="question">
        <summary>Q16. What is the main difference between Gradient Descent and Newton's method?</summary>
        <p>
          Gradient Descent uses first-order gradient information.
          Newton's method uses second-order Hessian information.
        </p>
      </details>

      <details class="question">
        <summary>Q17. Why is full Newton's method expensive for deep learning?</summary>
        <p>
          The Hessian for d parameters is a d × d matrix.
          Storing it requires O(d²) space and direct inversion
          can require O(d³) operations.
        </p>
      </details>

      <details class="question">
        <summary>Q18. What is learning-rate scheduling?</summary>
        <p>
          It is the process of changing the learning rate during
          training according to a predefined or metric-based strategy.
        </p>
      </details>

      <details class="question">
        <summary>Q19. What is warm-up?</summary>
        <p>
          Warm-up gradually increases the learning rate during
          the initial part of training.
        </p>
      </details>

      <details class="question">
        <summary>Q20. How does Momentum improve gradient descent?</summary>
        <p>
          It accumulates past gradients in a velocity vector,
          accelerating consistent movement and reducing oscillations.
        </p>
      </details>

      <details class="question">
        <summary>Q21. What is the main difference between Momentum and Nesterov momentum?</summary>
        <p>
          Momentum calculates the gradient at the current parameter
          position. Nesterov calculates it at a look-ahead position.
        </p>
      </details>

      <details class="question">
        <summary>Q22. Why is Adagrad useful for sparse features?</summary>
        <p>
          It decreases the learning rate more for frequently updated
          parameters while preserving relatively larger rates for
          infrequently updated parameters.
        </p>
      </details>

      <details class="question">
        <summary>Q23. What is Adagrad's main limitation?</summary>
        <p>
          Its squared-gradient accumulator continually increases,
          potentially making the effective learning rate too small.
        </p>
      </details>

      <details class="question">
        <summary>Q24. How does RMSProp improve Adagrad?</summary>
        <p>
          RMSProp uses an exponentially weighted moving average
          of squared gradients instead of accumulating all historical
          squared gradients.
        </p>
      </details>

      <details class="question">
        <summary>Q25. Which two moving averages does Adam maintain?</summary>
        <p>
          A moving average of gradients and a moving average
          of squared gradients.
        </p>
      </details>

      <details class="question">
        <summary>Q26. Why does Adam use bias correction?</summary>
        <p>
          Its moment estimates are initialized at zero and can be
          biased towards zero during the early training steps.
          Bias correction compensates for this.
        </p>
      </details>

      <details class="question">
        <summary>Q27. What is the main difference between Adam and AdamW?</summary>
        <p>
          AdamW decouples weight decay from the adaptive gradient
          update, rather than adding the regularization term directly
          to the gradient used by Adam.
        </p>
      </details>

      <details class="question">
        <summary>Q28. What does optimizer.zero_grad() do in PyTorch?</summary>
        <p>
          It clears the gradients from the previous optimization step
          so that they do not unintentionally accumulate.
        </p>
      </details>

      <details class="question">
        <summary>Q29. What is the purpose of loss.backward()?</summary>
        <p>
          It calculates gradients of the loss with respect to
          parameters using automatic differentiation.
        </p>
      </details>

      <details class="question">
        <summary>Q30. What is the purpose of optimizer.step()?</summary>
        <p>
          It updates the model parameters using the gradients
          and the optimizer's update rule.
        </p>
      </details>

      <hr />

      <h2>11. Quick Revision: What You Must Remember</h2>

      <div class="note">
        <strong>Most important Week 5 concepts</strong>
        <ol>
          <li>Optimization minimizes the objective function.</li>
          <li>Deep learning ultimately aims for low generalization error.</li>
          <li>Empirical risk is training-data loss; true risk is population-level expected loss.</li>
          <li>Regularization helps control overfitting.</li>
          <li>Deep learning optimization is generally non-convex.</li>
          <li>The three lecture challenges are local minima, saddle points and vanishing gradients.</li>
          <li>Every local minimum of a convex function is a global minimum.</li>
          <li>A convex function has a positive-semidefinite Hessian when twice differentiable.</li>
          <li>Jensen's inequality is E[f(X)] ≥ f(E[X]).</li>
          <li>Constrained optimization methods include Lagrangian, penalties and projections.</li>
          <li>Gradient descent moves opposite to the gradient.</li>
          <li>Newton's method uses the Hessian.</li>
          <li>Batch GD uses all examples; SGD uses one; mini-batch GD uses a subset.</li>
          <li>Mini-batch GD is efficient because of vectorization.</li>
          <li>Learning-rate schedules change the learning rate during training.</li>
          <li>Momentum uses past gradients.</li>
          <li>Nesterov uses a look-ahead gradient.</li>
          <li>Adagrad adapts learning rates using accumulated squared gradients.</li>
          <li>RMSProp uses a moving average of squared gradients.</li>
          <li>AdaDelta also tracks past parameter updates.</li>
          <li>Adam combines Momentum and RMSProp.</li>
          <li>AdamW decouples weight decay from the adaptive gradient update.</li>
        </ol>
      </div>

      <h2>12. Week 5 Topic Coverage Checklist</h2>

      <p>
        Use this checklist to verify that you have studied every major
        topic from the provided lecture and supporting notebooks.
      </p>

      <ul>
        <li>Optimization in deep learning</li>
        <li>Empirical risk and true risk</li>
        <li>Optimization versus regularization</li>
        <li>Non-convex loss landscapes</li>
        <li>Local minima</li>
        <li>Saddle points and Hessian eigenvalues</li>
        <li>Vanishing gradients</li>
        <li>Convex sets and their properties</li>
        <li>Convex functions and examples</li>
        <li>Local minima are global minima for convex functions</li>
        <li>Second derivative and Hessian conditions</li>
        <li>Jensen's inequality</li>
        <li>Constrained optimization</li>
        <li>Lagrangian multipliers</li>
        <li>Penalty methods and weight decay</li>
        <li>Projection methods</li>
        <li>Taylor expansion and gradient descent derivation</li>
        <li>Learning-rate selection</li>
        <li>Multivariate gradient descent</li>
        <li>Newton's method</li>
        <li>Batch Gradient Descent</li>
        <li>Stochastic Gradient Descent</li>
        <li>Mini-Batch Gradient Descent</li>
        <li>Vectorization and computational efficiency</li>
        <li>Learning-rate scheduling</li>
        <li>Momentum and Nesterov</li>
        <li>Adagrad</li>
        <li>RMSProp</li>
        <li>AdaDelta</li>
        <li>Adam and bias correction</li>
        <li>AdamW</li>
        <li>PyTorch optimizer implementations</li>
        <li>Optimizer comparison and training best practices</li>
      </ul>

      <div class="note">
        <strong>Source and scope note</strong>
        <p>
          These notes are based on the supplied Week 5 lecture slides,
          Gradient Descent notebook and Advanced Optimization notebook.
          The practice questions are original revision questions
          written from those topics, not copied official graded
          assignment questions.
        </p>
      </div>
    </article>
  </main>
</template>

<script>
import SiteHeader from '../components/SiteHeader.vue';
import CourseSidebar from '../components/CourseSidebar.vue';

export default {
  components: {
    SiteHeader,
    CourseSidebar
  }
};
</script>
