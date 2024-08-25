import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {
    // Initialize isSolanaTarget based on the current cargo target setting
    const config = vscode.workspace.getConfiguration('rust-analyzer');
    const currentTarget = config.get<string | undefined>("cargo.target");
    let isSolanaTarget = currentTarget === "solana";
    const defaultTarget = isSolanaTarget ? undefined : currentTarget;

    const updateStatusBar = (statusBar: vscode.StatusBarItem) => {
        statusBar.text = isSolanaTarget ? "$(debug-start)" : "$(debug-stop)";
        statusBar.tooltip = isSolanaTarget ? 'Target: Solana' : 'Target: Default';
        statusBar.show();
    };

    const disposable = vscode.commands.registerCommand('solanaTargetSwitcher.toggle', async () => {
        isSolanaTarget = !isSolanaTarget;
        
        let target = isSolanaTarget ? "solana" : defaultTarget || undefined;

        await config.update("cargo.target", target, vscode.ConfigurationTarget.Workspace);

        updateStatusBar(statusBar);

        vscode.commands.executeCommand("rust-analyzer.restartServer");
        vscode.window.showInformationMessage(`Target: ${isSolanaTarget ? "Solana" : "Default"}`);
    });

    // Create a status bar item to show and toggle the target_os
    let statusBar = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Left, 100);
    updateStatusBar(statusBar);  // Set initial text based on current target
    statusBar.command = 'solanaTargetSwitcher.toggle';
    statusBar.show();

    context.subscriptions.push(disposable);
    context.subscriptions.push(statusBar);
}

export function deactivate() {}
