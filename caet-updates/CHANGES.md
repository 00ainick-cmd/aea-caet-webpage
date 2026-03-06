# Changes to Existing CAET Page (aea.net/caet)

## Summary
Four targeted edits to the current `/caet/` page. No structural changes — just removing "Available in 2026" labels from CAET-Advanced and adding links to the new page.

---

## Change 1: Remove "Available in 2026" from Advanced Badge Image Area

**Location:** Badge display section (around the three badge images — CAET Certified, CAET Advanced, CAET Pro)

**Current state:**
```
CAET_Advanced_480.png
Available in 2026
```

**New state:**
```
CAET_Advanced_480.png
(no "Available in 2026" text — badge stands alone)
```

**Action:** Delete the "Available in 2026" text under the CAET-Advanced badge image. Keep the text under CAET-Pro.

---

## Change 2: Remove "Available in 2026" from Advanced Badge Comparison Card

**Location:** Badge comparison cards section (three columns: CAET, CAET-Advanced, CAET-Pro)

**Current state:**
```
CAET-Advanced
• Available in 2026
• Wire harness
• Pitot/static
...
```

**New state:**
```
CAET-Advanced
• Wire harness
• Pitot/static
...
```

**Action:** Remove the "Available in 2026" bullet from the CAET-Advanced column. Keep it in the CAET-Pro column.

---

## Change 3: Link CAET-Advanced Badge Image to New Page

**Location:** Both the badge image area and the badge comparison card

**Action:** Wrap the CAET-Advanced badge image (`CAET_Advanced_480.png`) in a link to `/CAET-Advanced`

```html
<a href="/CAET-Advanced">
    <img src="/images/caet/CAET_Advanced_480.png" alt="CAET Advanced">
</a>
```

---

## Change 4: Link CAET-Advanced Text to New Page

**Location:** Badge comparison card, the "CAET-Advanced" heading text

**Current state:**
```html
<a href="#">CAET-Advanced</a>
```

**New state:**
```html
<a href="/CAET-Advanced">CAET-Advanced</a>
```

---

---

## Change 5: Add AET → CAET Gap Exam Section

**Location:** New section on the `/caet/` page OR new FAQ entry

**Action:** Add information about the gap exam for legacy NCATT AET holders who want to bridge to CAET certification. This is an AET → CAET pathway, NOT related to CAET-Advanced.

**Content pending:** Full details from Alexis on gap exam structure, eligibility, and registration.

**Suggested placement:** Either a new section between "Take the CAET Exam" and "Prepare for the Exam," or a new FAQ entry under the General tab titled "I already hold my NCATT AET. How do I get my CAET?"

---

## Verification Checklist
After changes are made, confirm:
- [ ] "Available in 2026" is GONE from CAET-Advanced (both locations)
- [ ] "Available in 2026" REMAINS on CAET-Pro (both locations)
- [ ] CAET-Advanced badge image links to `/CAET-Advanced`
- [ ] CAET-Advanced text in comparison card links to `/CAET-Advanced`
- [ ] AET → CAET gap exam info is on THIS page (not on CAET-Advanced)
- [ ] All other page content is unchanged

---

## Change 5: Add AET → CAET Gap Exam Info

**Location:** New section or FAQ entry on the existing `/caet/` page

**Content:** Information about the gap exam pathway for technicians who hold the legacy NCATT AET certification and want to bridge to CAET. This is NOT a CAET → CAET-Advanced pathway.

**Note:** Full details pending from Alexis. Add as either:
- A new section titled "Already hold your AET?" above the FAQ
- A new FAQ entry under the General tab

**Key message:** If you already hold your NCATT AET, you may be eligible for a streamlined gap exam to earn your CAET certification.
