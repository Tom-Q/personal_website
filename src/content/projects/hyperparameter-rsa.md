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

We trained 4608 feedforward networks on a dual digit classification task, drawn from a fully crossed grid of eight hyperparameters (batch size, hidden layer size, learning rate, activation function, optimizer, weight initialization, L1 and L2 regularization). Representational geometry was compared across the 1504 networks that met a 90% accuracy threshold, using RSA and PCA. Activation function (ReLU vs. tanh/sigmoid) was the largest source of variation, with hidden layer size, optimizer, and learning rate also contributing. L1 and L2 regularization had negligible influence. These results show that networks with comparable accuracy can differ substantially in their internal representational structure, which poses a challenge for RSA-based model-brain comparisons. They also show that the relationship between hyperparameters and representations is not straightforwardly interpretable: effects do not reduce to individual factors, and how hyperparameter combinations transform representational geometry is not yet well understood.

Kirsten and I are currently extending this work in two directions: to better characterise how hyperparameter interactions transform representational geometry during and after training, and to validate the results beyond the single task used here.
