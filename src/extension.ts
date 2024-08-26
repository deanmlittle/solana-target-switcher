import * as vscode from 'vscode';
import * as child_process from 'child_process';
import * as path from 'path';

export function activate(context: vscode.ExtensionContext) {
    // Initialize isSolanaTarget based on the current cargo target setting
    const config = vscode.workspace.getConfiguration('rust-analyzer');
    const currentTarget = config.get<string | undefined>("cargo.target");
    let isSolanaTarget = currentTarget === "sbf-solana-solana";
    const defaultTarget = isSolanaTarget ? undefined : currentTarget;

    function getSolanaPaths(): { cargoPath: string, rustcPath: string } | undefined {
        try {
            // Run "which solana" to get the path to the solana binary
            const solanaPath = child_process.execSync('which solana').toString().trim();

            if (!solanaPath) {
                vscode.window.showErrorMessage('Could not find the Solana installation using "which solana".');
                return undefined;
            }

            // Remove "/solana" and append the directory of our Solana rustc/cargo
            const baseDir = path.dirname(solanaPath);
            const sdkDir = path.join(baseDir, "sdk", "sbf", "dependencies", "platform-tools", "rust", "bin");

            const cargoPath = path.join(sdkDir, "cargo");
            const rustcPath = path.join(sdkDir, "rustc");

            return { cargoPath, rustcPath };
        } catch (error) {
            vscode.window.showErrorMessage(`Error finding Solana paths: ${error}`);
            return undefined;
        }
    }

    function updateVSCodeConfig(isSolanaTarget: boolean, solanaPaths: { cargoPath: string, rustcPath: string }) {
        const config = vscode.workspace.getConfiguration('rust-analyzer');

        if (isSolanaTarget) {
            // Add Solana specific configurations
            config.update("cargo.target", "sbf-solana-solana", vscode.ConfigurationTarget.Workspace);
            config.update("cargo.extraEnv", {
                "CARGO": solanaPaths.cargoPath,
                "RUSTC": solanaPaths.rustcPath
            }, vscode.ConfigurationTarget.Workspace);
        } else {
            // Revert to the default target, keep extraEnvs if they exist
            config.update("cargo.target", defaultTarget || undefined, vscode.ConfigurationTarget.Workspace);
        }
    }

    const solanaPaths = getSolanaPaths();
    if (!solanaPaths) {
        return;
    }

    const updateStatusBar = (statusBar: vscode.StatusBarItem) => {
        statusBar.text = isSolanaTarget ? "$(debug-start)" : "$(debug-stop)";
        statusBar.tooltip = isSolanaTarget ? "Target: Solana" : "Target: " + (defaultTarget || "Default");
        statusBar.show();
    };

    const disposable = vscode.commands.registerCommand('solanaTargetSwitcher.toggle', async () => {
        isSolanaTarget = !isSolanaTarget;
        updateVSCodeConfig(isSolanaTarget, solanaPaths);
        updateStatusBar(statusBar);
    });

    let statusBar = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Left, 100);
    updateStatusBar(statusBar);  // Set initial text based on current target
    statusBar.command = 'solanaTargetSwitcher.toggle';
    statusBar.show();

    context.subscriptions.push(disposable);
    context.subscriptions.push(statusBar);
}

export function deactivate() {}
