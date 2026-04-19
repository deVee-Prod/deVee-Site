# Specification

## Summary
**Goal:** Update the /info page to display the expanded, user-provided Hebrew studio description with correct right-to-left (RTL) rendering, while keeping the existing layout and styling conventions intact.

**Planned changes:**
- Replace the current studio description on the Info page with the provided expanded Hebrew content (heading + three paragraphs), preserving emphasis/bold styling using existing JSX/HTML conventions.
- Ensure the Info page content container renders RTL correctly (direction and right alignment) without introducing malformed markup.
- Keep the existing Info page layout structure, spacing, and typography class patterns consistent with the rest of the site, and do not change routing (/info).

**User-visible outcome:** Visiting `/info` shows the updated expanded Hebrew studio description rendered properly in RTL, with the same overall page layout and styling as before.
