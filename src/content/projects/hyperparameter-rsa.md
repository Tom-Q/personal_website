---
title: "Hyperparameters and Representational Geometry in Neural Networks"
summary: "Do the training choices you make when building a neural network affect what it learns to represent internally? Yes, substantially, even among networks that perform comparably on the same task. This has direct implications for research that uses neural networks as models of the brain."
tags: ["python", "neuroscience", "RSA", "deep learning", "data analysis"]
status: "active"
category: "research"
order: 0
---

This was Kirsten Devolder's master's thesis, supervised by myself, Sven Wientjes, and Prof. Clay Holroyd, with Kirsten and I working closely together throughout. Although the initial idea was mine, she carried out the bulk of the implementation and analysis, and took part in important design decisions as they arose.

Artificial neural networks are widely used as computational models of the brain, with hyperparameters typically chosen based on task accuracy. But networks with comparable accuracy on the same task can develop substantially different internal representations, which matters if you are comparing those representations to brain data.

In the initial study, we trained 4608 feedforward networks on a dual digit classification task, drawn from a fully crossed grid of eight hyperparameters (batch size, hidden layer size, learning rate, activation function, optimizer, weight initialization, L1 and L2 regularization). Representational geometry was compared across the 1504 networks that met a 90% accuracy threshold, using RSA and PCA. Activation function (ReLU vs. tanh/sigmoid) was the largest source of variation, with hidden layer size, optimizer, and learning rate also contributing. L1 and L2 regularization had negligible influence. These results show that networks with comparable accuracy can differ substantially in their internal representational structure, which poses a challenge for RSA-based model-brain comparisons. They also show that the relationship between hyperparameters and representations is not straightforwardly interpretable: effects do not reduce to individual factors, and how hyperparameter combinations transform representational geometry is not yet well understood.

The initial study used a fixed grid of hyperparameters on a single task. This follow-up extends the work across nine tasks: supervised classification, recurrent networks, and reinforcement learning, testing whether the same patterns hold across paradigms and problem types. A possible tenth task (an Atari game) may follow, targeting harder problems where fewer networks are feasible.

The main methodological challenge at this point is how to sample the hyperparameter space efficiently when networks are expensive to train. A fully crossed grid quickly becomes computationally prohibitive; random search wastes resources on known-bad regions. We use Bayesian optimisation with a custom acquisition function designed for this setting: a Gaussian process that models task performance, with two unusual properties. First, the performance objective is normalised linearly above chance, so, assuming chance at 10%, the difference between a 90% and 99% accurate network matters less than the difference between an 80% and a 90% accurate network. What matters is that the networks actually do something. Second, a saturation term discourages repeated sampling of already well-explored regions, naturally pushing the search away from already well-sampled regions of state space. Training runs on AWS CPU instances: GPU acceleration is of limited benefit for the small networks involved, and the sheer number of networks required, including intentionally mediocre and slow-to-train configurations, demands hundreds of hours of compute time.

[View on GitHub →](https://github.com/Tom-Q/hyperparams_and_geometry)
