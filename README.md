# Solana Target Switcher - VSCode Extension

## Overview

The **Solana Target Switcher** is a simple VSCode extension designed to help you quickly switch between your default Rust build target and the "solana" target OS. This is particularly useful for developers working on cross-platform Solana libraries and need to frequently toggle between different build targets but don't want tomanually setup/edit configuration files.

## Features

- **Toggle Build Target:** Easily switch between your default Rust build target and the `solana` target with a single click.

## Usage

1. **Activate the Extension:**
   - The extension is not activated by default. To activate is, simply search for and run "Toggle Solana Target OS" in VSCode.
  
2. **Toggle Between Targets:**
   - Click the icon in the status bar to toggle between the default Rust build target and the "solana" target.
   - The Solana icon will appear solid if Solana is selected, or as an outlined version otherwise.

3. **Configuration:**
   - The extension modifies the `rust-analyzer.cargo.target` and `rust-analyzer.cargo.extraArgs` setting in your VSCode workspace configuration.

## Contribution

Feel free to open issues or submit pull requests to improve this extension. Contributions are welcome!

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.