"use client"
import { useEffect } from 'react';

const ChatwootWidget = () => {
    useEffect(() => {
        const BASE_URL = 'https://help.maple-global.com';
        const script = document.createElement('script');
        script.src = `${BASE_URL}/packs/js/sdk.js`;
        script.defer = true;
        script.async = true;

        script.onload = () => {
            window.chatwootSettings = {
                position: 'left',
                type: 'standard',
                launcherTitle: 'Live Chat',
            };

            window.chatwootSDK.run({
                websiteToken: 'd9bDmQejMFJayDMSrgZLrg1S',
                baseUrl: BASE_URL,
            });
        };

        document.head.appendChild(script);

        return () => {
            // Clean up the script if the component is unmounted
            document.head.removeChild(script);
        };
    }, []);

    return null;
};

export default ChatwootWidget;