module Inknote {

    export function check(text: string, onTrue: () => void, onFalse?: () => void): boolean {
        if (confirm(text)) {

            onTrue();

            return;
        }

        onFalse();
    }

} 