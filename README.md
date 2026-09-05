# Embedded Engineering Toolkit

Practical browser-based calculators and references for embedded systems development.

## 🌐 Live Website

<https://embedded-engineering-toolkit.pages.dev/>

The site has English routes and Simplified Chinese equivalents under `/zh/`. Calculations run in the browser and expose their assumptions; they are engineering aids, not replacements for device documentation or measurements.

## Available Tools

| Tool | What it does | Online |
| --- | --- | --- |
| STM32 Timer & PWM Calculator | Calculates counter clock, period, PWM frequency and edge-aligned duty from timer clock, PSC, ARR and CCR; includes bounded target-frequency solving with error reporting. | [Open tool](https://embedded-engineering-toolkit.pages.dev/tools/stm32-timer-pwm/) |
| UART Transmission Time Calculator | Calculates frame bits, total line bits, theoretical transmission time and UART data-field payload bit rate for a selected frame format and frame count. | [Open tool](https://embedded-engineering-toolkit.pages.dev/tools/uart-transmission-time/) |
| Classical CAN Bus Load Calculator | Estimates Classical CAN bus load for standard or extended identifiers, with the documented no-stuffing and 20% planning-estimate views. | [Open tool](https://embedded-engineering-toolkit.pages.dev/tools/can-bus-load/) |

## Why this project exists

Timer PSC/ARR values, PWM frequency, UART framing and clock-derived calculations look simple but are easy to misread. This project provides fast, transparent, browser-based checks with formulas, worked examples and explicit limits.

## Example: STM32 Timer

For a 72 MHz timer input clock, PSC = 71 and ARR = 999 produce a 1 MHz counter clock and a 1 kHz PWM frequency. With CCR = 250 in the documented edge-aligned model, the computed duty is 25%.

[Try the STM32 Timer & PWM Calculator](https://embedded-engineering-toolkit.pages.dev/tools/stm32-timer-pwm/)

## Local Development

```bash
npm install
npm run dev
```

Useful checks:

```bash
npm run test
npm run validate
npm run build
node scripts/validate-build.mjs
```

`npm run validate` runs the tests, static build and generated-site checks. The production output is written to `dist/`.

## Tech Stack

- Astro static output
- TypeScript calculation modules
- Dependency-free browser UI adapters
- Vitest tests
- `@astrojs/sitemap`
- Cloudflare Pages for the live deployment

## Project Status

Active development. The current site includes UART, Classical CAN and STM32 Timer/PWM calculators, English and Simplified Chinese routes, guides and worked examples.

## Feedback

Please use GitHub Issues for calculation errors, incorrect assumptions, device-specific behavior and feature requests. For STM32 reports, include the MCU model, timer instance and relevant clock-tree settings.

## Disclaimer

The calculators are engineering aids, not substitutes for datasheets, reference manuals, measurement equipment or vendor configuration tools. Confirm timing-sensitive results on the target device.

## License

This repository does not currently include a `LICENSE` file. No open-source license is being claimed here; add and document one before redistributing under specific license terms.
