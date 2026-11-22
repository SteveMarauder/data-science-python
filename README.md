# 資料科學慢學 · Data Science Notes

Independent learning companion to *Learning Data Science*, first edition (2023), by Sam Lau, Joseph Gonzalez, and Deborah Nolan, O’Reilly Media. ISBN 9781098113001.

Website: https://stevemarauder.github.io/data-science-python/

21 Chinese/English/Japanese chapter guides, 42 original concept checks, 21 downloadable Python teaching examples, 7 original diagrams (3 interactive), and an inventory of 291 source subsection headings with Japanese translations. These are focused independent chapter overviews, **not a full book translation**. Synthetic examples are distinct from the book’s actual data and results.

The Scientific Learning Site / Bayes Notes template supplies the scientific publishing design, responsive connected route, visible light/dark controls, local progress, quiz interactions, and PDF.js reader. This course uses a separate progress namespace: `learning-data-science:edition1:v1`. Existing Bayes Notes records are unaffected.

## Run locally

Requires Node.js 22 or newer; no npm dependencies are needed for the static website.

```sh
npm start
```

Open the printed localhost URL over HTTP. Do not double-click index.html. In a lesson, open Source companion and select your legally held first-edition PDF. Files are processed in browser memory and never uploaded. The supplied edition has 597 PDF pages; printed page + 22 = PDF page. Other editions may differ. Reloading requires selecting the file again.

## Verify and build

```sh
npm run check
npm run build
```

The check validates curriculum identities, quiz answers, source ranges, route geometry, progress semantics, and teaching calculations. `dist/` contains the static application, vendor libraries, and examples. GitHub Pages can serve the repository root with `.nojekyll`.

## Python examples

```sh
python -m pip install numpy pandas matplotlib scikit-learn
python examples/chapter_06.py
```

Python code is displayed on the site and runs in your own environment. It is not executed by the browser. Chapter 11 writes a PNG to the current working directory. Examples use toy or synthetic data, no external API credentials or downloads.

## Sources, privacy, and license

- Authors’ online material: https://learningds.org/
- Original book copyright is separate. No PDF or full extracted source text is included in Git or deployment.
- Original guides, checks, examples, and diagrams: CC BY 4.0. Website/template code: MIT; bundled vendor packages retain their notices. See CONTENT-LICENSE.txt and LICENSE.
- Progress is stored only in this browser. Export/import JSON from My learning to back it up. No analytics, account requirement, or quiz-data upload.

Japanese covers all chapter guides, quizzes and explanations, concept definitions, source headings, diagrams, and navigation. Python source remains unchanged across languages. A local lexical highlighter escapes code before rendering; no third-party script requests are needed.
