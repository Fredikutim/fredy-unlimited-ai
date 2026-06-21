# Contributing to Fredy Unlimited AI

Thank you for your interest in contributing! This document provides guidelines and instructions for contributing to the project.

## Code of Conduct

Please be respectful and constructive in all interactions.

## How to Contribute

### 1. Fork the Repository

```bash
git clone https://github.com/Fredikutim/fredy-unlimited-ai.git
cd fredy-unlimited-ai
```

### 2. Create a Feature Branch

```bash
git checkout -b feature/your-feature-name
```

### 3. Make Your Changes

- Write clean, readable code
- Follow the existing code style
- Add comments for complex logic
- Test your changes

### 4. Commit Your Changes

```bash
git commit -m "feat: add your feature description"
```

**Commit Message Format:**
- `feat:` for new features
- `fix:` for bug fixes
- `docs:` for documentation
- `style:` for code style changes
- `refactor:` for code refactoring
- `test:` for test changes

### 5. Push to Your Fork

```bash
git push origin feature/your-feature-name
```

### 6. Create a Pull Request

- Provide a clear title and description
- Link related issues
- Ensure all tests pass
- Wait for review

## Development Setup

See [SETUP.md](./docs/SETUP.md) for detailed setup instructions.

## Testing

```bash
# Run tests
npm test

# Run with coverage
npm run test:coverage
```

## Coding Standards

- Use ES6+ features
- Follow ESLint configuration
- Use meaningful variable names
- Add JSDoc comments for functions
- Keep functions small and focused

## Pull Request Process

1. Update documentation if needed
2. Ensure tests pass: `npm test`
3. Run linter: `npm run lint`
4. Build project: `npm run build`
5. Request review from maintainers

## Issues

### Reporting Bugs

Include:
- Description of the bug
- Steps to reproduce
- Expected behavior
- Actual behavior
- Environment (OS, Node version, etc.)

### Suggesting Features

Include:
- Clear description of the feature
- Use cases and benefits
- Possible implementation approach

## License

By contributing, you agree that your contributions will be licensed under the MIT License.
