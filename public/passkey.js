(() => {
    const KNOWN_TRANSPORTS = ["usb", "nfc", "ble", "internal", "hybrid"];

    const toBuffer = (value) => {
        const padded = value.replace(/-/g, "+").replace(/_/g, "/");
        const binary = atob(padded + "=".repeat((4 - (padded.length % 4)) % 4));
        const bytes = new Uint8Array(binary.length);
        for (let i = 0; i < binary.length; i += 1) {
            bytes[i] = binary.charCodeAt(i);
        }
        return bytes;
    };

    const toBase64Url = (buffer) => {
        let binary = "";
        for (const byte of new Uint8Array(buffer)) {
            binary += String.fromCharCode(byte);
        }
        return btoa(binary).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
    };

    const toDescriptors = (list) =>
        (list || []).map((descriptor) => {
            const mapped = { type: descriptor.type, id: toBuffer(descriptor.id) };
            if (Array.isArray(descriptor.transports)) {
                mapped.transports = descriptor.transports.filter((transport) =>
                    KNOWN_TRANSPORTS.includes(transport),
                );
            }
            return mapped;
        });

    const supported = () =>
        Boolean(window.PublicKeyCredential && navigator.credentials);

    const create = async (json) => {
        if (!supported()) {
            throw new Error("this browser has no passkey support");
        }
        const options = JSON.parse(json).publicKey;
        options.challenge = toBuffer(options.challenge);
        options.user.id = toBuffer(options.user.id);
        if (options.excludeCredentials) {
            options.excludeCredentials = toDescriptors(options.excludeCredentials);
        }

        const credential = await navigator.credentials.create({ publicKey: options });
        const transports = credential.response.getTransports
            ? credential.response
                  .getTransports()
                  .filter((transport) => KNOWN_TRANSPORTS.includes(transport))
            : [];

        return JSON.stringify({
            id: credential.id,
            rawId: toBase64Url(credential.rawId),
            type: credential.type,
            response: {
                attestationObject: toBase64Url(credential.response.attestationObject),
                clientDataJSON: toBase64Url(credential.response.clientDataJSON),
                transports,
            },
        });
    };

    const get = async (json) => {
        if (!supported()) {
            throw new Error("this browser has no passkey support");
        }
        const options = JSON.parse(json).publicKey;
        options.challenge = toBuffer(options.challenge);
        if (options.allowCredentials) {
            options.allowCredentials = toDescriptors(options.allowCredentials);
        }

        const credential = await navigator.credentials.get({ publicKey: options });
        return JSON.stringify({
            id: credential.id,
            rawId: toBase64Url(credential.rawId),
            type: credential.type,
            response: {
                authenticatorData: toBase64Url(credential.response.authenticatorData),
                clientDataJSON: toBase64Url(credential.response.clientDataJSON),
                signature: toBase64Url(credential.response.signature),
                userHandle: credential.response.userHandle
                    ? toBase64Url(credential.response.userHandle)
                    : null,
            },
        });
    };

    window.__passkey = { create, get, supported };
})();
