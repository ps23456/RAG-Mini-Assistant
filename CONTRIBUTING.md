# Contributing to Multi-Modal RAG Assistant

Thank you for your interest in contributing! We welcome contributions from the community.

## 🚀 Getting Started

1. **Fork the repository**
2. **Clone your fork**
   ```bash
   git clone https://github.com/ps23456/RAG-Mini-Assistant.git
   ```
3. **Create a branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

## 🛠 Development Setup

### Backend Setup
```bash
cd backend
python -m venv venv
source venv/bin/activate
pip install -r requirements.txt
```

### Frontend Setup
```bash
cd frontend
yarn install
```

## 📝 Coding Standards

### Python (Backend)
- Follow PEP 8 style guide
- Use type hints where possible
- Add docstrings for functions and classes
- Maximum line length: 120 characters

**Formatting:**
```bash
# Install formatters
pip install black isort flake8

# Format code
black backend/
isort backend/

# Lint
flake8 backend/
```

### JavaScript/React (Frontend)
- Use functional components with hooks
- Follow ESLint configuration
- Use meaningful variable names
- Add PropTypes or TypeScript types

**Formatting:**
```bash
# Format code
yarn format

# Lint
yarn lint
```

## 🧪 Testing

### Backend Tests
```bash
cd backend
pytest tests/ -v --cov=.
```

### Frontend Tests
```bash
cd frontend
yarn test
```

## 📦 Commit Guidelines

We follow [Conventional Commits](https://www.conventionalcommits.org/):

```
<type>(<scope>): <subject>

<body>

<footer>
```

**Types:**
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting, etc.)
- `refactor`: Code refactoring
- `test`: Adding or updating tests
- `chore`: Maintenance tasks

**Examples:**
```bash
git commit -m "feat(backend): add support for video transcription"
git commit -m "fix(frontend): resolve upload progress bar issue"
git commit -m "docs: update API documentation"
```

## 🔍 Pull Request Process

1. **Update documentation** if needed
2. **Add tests** for new features
3. **Ensure all tests pass**
4. **Update CHANGELOG.md**
5. **Submit PR** with clear description

### PR Template
```markdown
## Description
Brief description of changes

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update

## Testing
- [ ] All tests pass
- [ ] New tests added

## Screenshots (if applicable)

## Checklist
- [ ] Code follows style guidelines
- [ ] Self-review completed
- [ ] Documentation updated
- [ ] No new warnings
```

## 🐛 Reporting Bugs

Use GitHub Issues with the bug template:

**Title:** Clear, concise bug description

**Description:**
- Steps to reproduce
- Expected behavior
- Actual behavior
- Screenshots (if applicable)
- Environment details

## 💡 Feature Requests

Use GitHub Issues with the feature template:

**Title:** Feature name

**Description:**
- Problem it solves
- Proposed solution
- Alternative solutions considered
- Additional context

## 📚 Documentation

- Keep README.md updated
- Add JSDoc/docstrings for new functions
- Update API documentation for new endpoints
- Include code examples

## 🌟 Recognition

Contributors will be recognized in:
- README.md Contributors section
- Release notes
- Project documentation

## 📞 Questions?

- Open a GitHub Discussion
- Join our community chat
- Email: your.email@example.com

Thank you for contributing! 🎉
