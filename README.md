# AT-Portfolio

## Logo showcase data

Add an optional `logo` object to a project in `assets/data/portfolio.json` to control its appearance in the `Illustrations` filter and show a separate logo-process modal:

```json
"logo": {
  "enabled": true,
  "description": "Describe the logo concept and visual decisions.",
  "process": "Explain how the logo was developed.",
  "tools": ["Canva Pro"]
}
```

Projects with a `project-card-header` are included in `Illustrations` by default. Set `"enabled": false` to exclude one. Add the optional fields above to display a `Logo details` button and its separate modal.
