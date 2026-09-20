# AT-Portfolio

## Logo showcase data

Add an optional `logo` object to a project in `assets/data/portfolio.json` to control its appearance in the `Illustrations` filter and show a separate Brand Assets modal:

```json
"logo": {
  "enabled": true,
  "description": "Describe the logo concept and visual decisions.",
  "strategy": "Explain the brand positioning, audience, and visual direction.",
  "process": "Explain how the logo was developed.",
  "tools": ["Canva Pro"],
  "assets": [
    {
      "src": "../assets/images/projects/logo-board.png",
      "alt": "Logo exploration board",
      "label": "Logo exploration"
    }
  ]
}
```

Projects with a `project-card-header` are included in `Illustrations` by default. Set `"enabled": false` to exclude one. Add `strategy` to describe the branding approach, and `assets` to display a navigable image slider in the Brand Assets modal.
