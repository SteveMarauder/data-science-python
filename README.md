# 資料科學慢學 · Data Science Notes

Free, noncommercial personal learning and project-sharing site by SteveMarauder.

Website: https://stevemarauder.github.io/data-science-python/
Sources, permissions and contact: https://stevemarauder.github.io/data-science-python/rights.html

21 independent Chinese/English/Japanese concept guides, 42 original checks, 21 Python examples using synthetic data, and seven independently drawn concept diagrams. Python is syntax-highlighted; language changes preserve lesson IDs and progress. These notes were produced with AI assistance and are not a professionally reviewed or endorsed edition of the source book.

## Publication scope after the rights review (2026-11-24)

The reference book is *Learning Data Science*, first edition (2023), Sam Lau, Joseph Gonzalez and Deborah Nolan, O’Reilly Media, ISBN 9781098113001. The authors’ online edition at https://learningds.org/intro.html states **CC BY-NC-ND 4.0** (https://creativecommons.org/licenses/by-nc-nd/4.0/). That grant does not authorize sharing adapted material, including translations. Its scope is not assumed to include every figure or layout from a separately supplied print PDF.

No separate written public-translation or PDF-image permission has been obtained. Extracted chapter bodies, their Chinese translations, PDF page/formula/table images and the comprehensive extracted subsection outline have been withdrawn from the current public tree. Each guide now links to its official source chapter. No PDF or screenshot upload is needed. The book and its original assets are not covered by this project's MIT/CC BY grants. No official affiliation or endorsement is claimed.

Free access, attribution and a “for study only” statement do not independently establish authorization or fair use. After explicit owner approval, main was rewritten to remove the book-bearing commit from its reachable history, while preserving earlier development commits and an offline local backup. This does **not** guarantee deletion of old commit views, platform caches, forks or downloads. Platform-side handling is separate; do not republish historical book material.

## Licenses

- Independent teaching contributions: CC BY 4.0; credit “Data Science Notes / 資料科學慢學 — SteveMarauder”, link the site/license, and mark changes. See CONTENT-LICENSE.txt. Existing CC BY grants remain effective; CC BY allows compliant commercial reuse even though this site itself is noncommercial.
- Website application code / retained Scientific Learning Site (Bayes Notes) template: MIT. The immutable retained template source was not edited.
- Marked, DOMPurify, KaTeX and KaTeX fonts: separate original licenses. See THIRD-PARTY-NOTICES.txt and vendor/. No extra noncommercial restrictions are applied to these software grants.
- Linked book, third-party names and marks: excluded from the site's grants. This site has no ads, paid reading tiers, affiliate marketing or sponsorship placements.

## Run, check and build

Requires Node.js 22 or newer; no npm dependencies are needed.

```sh
npm start
npm run check
npm run build
```

Open the printed localhost URL over HTTP. `dist/` contains the current static site and notices; packaging rejects excluded book assets. GitHub Pages serves the repository root with `.nojekyll`. Progress uses `learning-data-science:edition1:v1`; lesson, quiz, theme and language state is retained. Browser-local progress JSON import/export remains available. There are no accounts, analytics or answer uploads; hosting providers still process ordinary requests under their own policies.

Python is displayed, not executed, in the browser. To run the independent examples locally:

```sh
python -m pip install numpy pandas matplotlib scikit-learn
python examples/chapter_06.py
```

Chapter 11 writes a PNG to the current working directory. Examples use synthetic data and require no service credentials. Those locally installed Python packages retain their own licenses.

## Rights concerns

Open https://github.com/SteveMarauder/data-science-python/issues/new with the affected URL, the work, rights basis and requested correction. Issues are public: do not attach private IDs or contracts. Start by requesting a private contact route if necessary. See rights.html for full notices. No rights request has been sent to the authors or publisher on the owner's behalf.
