# Apprentice Site Migration

## Overview
Move the apprentice site from GitHub hosting to `aea.net/apprentice`. The site needs to be "de-standalone" — remove elements that duplicate the AEA site chrome since it will now live inside the main site.

## Migration Checklist

### Remove (handled by AEA site wrapper)
- [ ] Header squares / decorative header elements
- [ ] AEA logo in page header (it's already in the main site header)
- [ ] Any standalone navigation that duplicates the main AEA nav
- [ ] Standalone footer (if different from AEA footer)

### Move to FAQs
- [ ] **DOL CBOF Reference** — currently on the existing `aea.net/apprentice` page. Move this to the FAQ section of the new site. Link to the original PDF.
- [ ] **FAA Letter** — currently on the existing `aea.net/apprentice` page. Move this to the FAQ section of the new site. Link to the original PDF.

### Keep / Migrate
- [ ] All core apprentice program content
- [ ] Sign-up / enrollment information
- [ ] Program structure and requirements
- [ ] Any existing FAQ content (merge with the DOL/FAA items above)

## FAQ Format for Relocated Documents
The DOL CBOF reference and FAA letter should appear as FAQ entries that link directly to the PDF files:

**Example:**
> **Q: Where can I find the Department of Labor Certification of Beneficial Ownership Form (CBOF) reference?**
> A: [Download the DOL CBOF Reference (PDF)](/apprentice/pdf/dol-cbof-reference.pdf)

> **Q: Is there an FAA letter supporting the apprenticeship program?**
> A: [Download the FAA Letter (PDF)](/apprentice/pdf/faa-letter.pdf)

*Actual PDF paths may vary based on where the files are stored on the server.*

## URL
- Primary: `aea.net/apprentice`
- This URL already exists — the migration replaces the current content with the updated version from GitHub
