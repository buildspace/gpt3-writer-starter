{ pkgs }: {
  deps = [
    pkgs.nodejs-16_x
    pkgs.yarn
    pkgs.nodePackages.vscode-langservers-extracted
    pkgs.nodePackages.typescript-language-server
  ];
}