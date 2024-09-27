# Laravel i18next Vite Plugin

Laravel i18next is a powerful Vite plugin that bridges the gap between Laravel's localization system and i18next, a popular internationalization framework for JavaScript. This plugin allows you to seamlessly convert Laravel translation files into a format compatible with i18next, enabling you to use your Laravel translations in your frontend applications.

## Features

- Convert Laravel translation files to i18next-compatible JSON format
- Support for nested translations
- Handling of Laravel's pluralization rules
- Interpolation support for both Laravel and i18next styles
- TypeScript support
- Automatic conversion during development and build processes
- Hot Module Replacement (HMR) support for seamless development
- Export multiple translation files per language (namespaces)

## Installation

You can install the package via npm or yarn:

```bash
npm install vite-plugin-laravel-i18next
# or
yarn add vite-plugin-laravel-i18next
```

## Usage

### Integrating the Plugin with Vite

Update your `vite.config.ts`:

```typescript
import { defineConfig } from "vite";
import laravelI18nextPlugin from "vite-plugin-laravel-i18next";
import path from "path";

export default defineConfig({
  plugins: [
    laravelI18nextPlugin({
      laravelLangPath: path.resolve(
        dirname,
        "../path/to/laravel/resources/lang"
      ),
      outputPath: path.resolve(dirname, "./src/locales"),
    }),
  ],
  // ... other configurations
});
```

### Configuring i18next

```typescript
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
// Import all namespaces
import common_en from "./locales/en/common.json";
import auth_en from "./locales/en/auth.json";
import validation_en from "./locales/en/validation.json";
// Repeat for other languages

i18n.use(initReactI18next).init({
  lng: "en",
  fallbackLng: "en",
  ns: ["common", "auth", "validation"],
  defaultNS: "common",
  resources: {
    en: {
      common: common_en,
      auth: auth_en,
      validation: validation_en,
    },
    // Add other languages
  },
});
export default i18n;
```

### Using Translations in Your Application

```jsx
import { useTranslation } from "react-i18next";

function Login() {
  const { t } = useTranslation("auth"); // Specify 'auth' namespace

  return <div>{t("failed")}</div>; // Translates using 'auth.failed'
}

function ValidationMessage() {
  const { t } = useTranslation("validation");

  return <div>{t("required", { attribute: "email" })}</div>;
}
```

### Handling Pluralization

Laravel i18next supports Laravel's pluralization rules and converts them to i18next compatible format. Here's an example of how to use pluralization in a React component:

```tsx
import { useTranslation } from "react-i18next";

function AppleCounter({ count }) {
  const { t } = useTranslation("common");

  return <div>{t("apples", { count })}</div>;
}

// Usage
<AppleCounter count={0} /> // Outputs: There are no apples
<AppleCounter count={5} /> // Outputs: There are some apples
<AppleCounter count={25} /> // Outputs: There are many apples
```

The corresponding Laravel translation file might look like this:

```php
// resources/lang/en/common.php
return [
  'apples' => '{0} There are no apples|[1,19] There are some apples|[20,] There are many apples',
];
```

> The plugin will convert this to an i18next-compatible format, allowing you to use pluralization in your React components seamlessly.

### Interpolation

The package handles both Laravel and i18next style interpolations. Here's an example of how to use interpolation in a React component:

```typescript
import { useTranslation } from "react-i18next";

function Welcome({ name }) {
  const { t } = useTranslation("common");

  return <div>{t("welcome", { name })}</div>;
}

function Balance({ amount }) {
  const { t } = useTranslation("common");

  return <div>{t("balance", { amount })}</div>;
}

// Usage
<Welcome name="John" /> // Outputs: Welcome, John!
<Balance amount="$100" /> // Outputs: Your balance is $100
```

The corresponding Laravel translation file might look like this:

```php
// resources/lang/en/common.php
return [
  'welcome' => 'Welcome, :name!',
  'balance' => 'Your balance is {{amount}}',
];
```

> The plugin converts Laravel's `:parameter` syntax to i18next's `{{parameter}}` syntax, allowing you to use both styles in your Laravel translations.

## How It Works

The plugin performs the following tasks:

1. Reads Laravel translation files from the specified `laravelLangPath`.
2. Converts PHP arrays and JSON files to i18next-compatible JSON format.
3. Handles nested translations, pluralization, and interpolation.
4. Exports converted translations to the specified `outputPath`, organized by language and namespace.
5. Provides hot module replacement for seamless development experience.

## API Reference

### Plugin Options

The `laravelI18nextPlugin` function accepts an options object with the following properties:

- `laravelLangPath` (string): Path to the Laravel language files directory.
- `outputPath` (string): Path where the converted i18next JSON files will be saved.

### Conversion Details

- **Nested Arrays**: Converted to nested JSON objects.
- **Pluralization**: Laravel's pipe `|` syntax is converted to i18next's plural object format.
- **Interpolation**: Laravel's `:parameter` syntax is converted to i18next's `{{parameter}}` syntax.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is open-sourced software licensed under the [MIT license](https://opensource.org/licenses/MIT).

## Further Resources

- [Laravel Localization Documentation](https://laravel.com/docs/localization)
- [i18next Documentation](https://www.i18next.com/)
- [i18next Namespaces Guide](https://www.i18next.com/principles/namespaces)
- [React i18next Multiple Translation Files](https://react.i18next.com/guides/multiple-translation-files)
- [Vite Plugin Development Guide](https://vitejs.dev/guide/api-plugin.html)
