## Introduction

PathoGeneLit is a web server harnessing the open access scientific literature
on bacterial pathogens for gene functional analysis.

## Background

The core concept for this project is based on the excellent
[Rummagene](https://github.com/MaayanLab/rummagene), which allows for mining
of human gene lists in the literature. Up to this point, to my knowledge,
there is no other prokaryote-specific tool available for this purpose, hence
the development of PathoGeneLit.

The code for the data retrieval bot was adapted from the Rummagene bot
and is used here non-commercially, under the
[Attribution-NonCommercial-ShareAlike 4.0](https://github.com/MaayanLab/rummagene/blob/main/LICENSE)
license. It has been adapted to retrieve prokaryote gene lists and populate
a database with bacteria-specific gene information. Additionally,
some modifications have been made to the filtering of gene lists (to reduce
the maximum length allowed, given the smaller genome sizes of bacteria) and
database provisioning (which is here performed here using pure sql).

This project is built with [Next.js](https://nextjs.org).
