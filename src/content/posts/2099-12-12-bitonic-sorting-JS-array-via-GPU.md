---
title: ML in audio patches
description: vLooking at JSON representations of Malformed synth patches, tags, and abstracting xxxx
tags: draft
---


offloading sorting work to
previous art:
- offloading to a webworker
  -  easy if a single object w/ many keys
  - also optimized for UInt18 ??? (or what it was. some sort of "native" struct)
  - perforamnce suffers if arrays of itmes

- novel idea: offload to the GPU and leverage bitonic sort using a shader
   working demo: (strict POC)


