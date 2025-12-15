'use client';

import Link from 'next/link';
import * as React from 'react';
import { Button } from '@/components/ui/button';

export interface CTASectionProps {

    title: string;

    description: string;

    primaryButtonText: string;

    primaryButtonHref: string;

    secondaryButtonText?: string;

    secondaryButtonHref?: string;

    backgroundColor?: string;

    textColor?: string;

    className?: string;
}

export default function CTASection({
    title,
    description,
    primaryButtonText,
    primaryButtonHref,
    secondaryButtonText,
    secondaryButtonHref,
    backgroundColor = 'bg-[#351B59]',
    textColor = 'text-white',
    className = '',
}: CTASectionProps) {
    const [showPopup, setShowPopup] = React.useState(false);

    const openPopup: React.MouseEventHandler<HTMLAnchorElement> = React.useCallback((event) => {
        event.preventDefault();
        setShowPopup(true);
    }, []);

    const closePopup = React.useCallback(() => {
        setShowPopup(false);
    }, []);

    return (
        <section className={`w-full py-12 md:py-16 px-4 ${className}`}>
            <div className="relative mx-auto max-w-7xl">
                <div
                    className={`relative overflow-hidden rounded-2xl px-8 md:px-16 py-12 md:py-16 ${backgroundColor}`}
                >
                    {/* Left SVG background - occupies up to 40% width on desktop, full height and partially clipped */}
                    <div className="absolute -top-80 -bottom-80 left-[-70px] w-[135%] sm:w-[100%] md:w-[60%] lg:w-[65%] overflow-hidden pointer-events-none opacity-70 z-0">
                        {/* Inline SVG (kept inline so it crops naturally at container bounds) */}
                        <svg
                            width="1221"
                            height="830"
                            viewBox="0 0 1221 830"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            className="w-full h-full object-cover -translate-x-6"
                            aria-hidden="true"
                        >
                            <g clip-path="url(#clip0_2029_75)">
                                <path d="M326.092 227.292C330.321 225.289 336.25 225.289 340.499 227.292C372.655 242.497 519.062 318.606 519.062 318.606V318.657L657.127 389.27C659.889 390.674 662.149 392.712 663.732 395.143L663.771 395.126L666.107 398.756C667.652 401.153 668.464 403.859 668.464 406.633V724.888C668.464 727.661 667.652 730.367 666.107 732.764L663.771 736.411C662.187 738.842 659.908 740.88 657.166 742.284L491.716 826.886C486.192 829.711 479.375 829.728 473.852 826.903L473.812 826.886C468.251 824.06 464.833 818.821 464.833 813.137V508.511C464.833 502.843 461.414 497.621 455.891 494.779L342.237 436.614C336.695 433.772 329.877 433.772 324.334 436.614L26.8447 588.884C21.302 591.726 14.4843 591.726 8.96094 588.884C3.41838 586.041 9.72846e-05 580.802 0 575.135V405.862C0 403.088 0.811445 400.382 2.35645 397.985L4.69336 394.339C6.27697 391.89 8.55551 389.87 11.2979 388.466L147.489 318.743V318.606C147.489 318.606 293.917 242.514 326.092 227.292ZM1037.53 227.292C1040.67 227.292 1043.74 228.011 1046.47 229.415L1211.82 314.017C1217.36 316.86 1220.76 322.082 1220.76 327.749C1220.76 333.416 1217.34 338.673 1211.82 341.516L914.157 493.905C908.634 496.748 905.216 501.988 905.216 507.655V812.366C905.216 824.591 890.307 832.211 878.372 826.099L713.095 741.496C710.333 740.075 708.054 738.054 706.471 735.589L704.134 731.959C702.608 729.562 701.798 726.874 701.798 724.117C701.798 724.117 701.296 460.91 701.798 406.358C701.836 403.054 702.956 399.68 704.791 396.804C706.664 393.825 709.522 390.401 713.095 388.466C733.667 377.259 828.159 329.581 828.294 329.513L1023.83 229.415C1026.56 228.011 1029.65 227.292 1032.78 227.292H1037.53ZM990.751 2.13174C996.294 -0.71058 1003.11 -0.71058 1008.65 2.13174C1014.18 4.957 1017.6 10.2139 1017.6 15.8642V185.068C1017.6 187.876 1016.76 190.65 1015.16 193.064L1012.73 196.763C1011.14 199.143 1008.92 201.112 1006.22 202.499L695.463 361.6C692.74 362.987 689.669 363.723 686.521 363.724H681.887C678.758 363.724 675.667 363.005 672.944 361.6L507.494 276.981C501.971 274.139 498.553 268.899 498.553 263.231C498.553 257.564 501.952 252.325 507.494 249.482L990.751 2.13174Z" fill="white" fill-opacity="0.25"/>
                            </g>
                            <defs>
                                <clipPath id="clip0_2029_75">
                                    <rect width="1221" height="830" fill="white" />
                                </clipPath>
                            </defs>
                        </svg>
                    </div>

                    {/* Decorative Background Elements (optional) */}
                    <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/4" />
                    <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-900/20 rounded-full blur-3xl translate-y-1/2 -translate-x-1/4" />

                    {/* Content */}
                    <div className="relative z-10 max-w-4xl">
                        <h2
                            className={`text-[28px] md:text-[36px] lg:text-[42px] font-bold leading-[1.2] mb-6 ${textColor} text-center sm:text-left`}
                        >
                            {title}
                        </h2>

                        <p className={`text-[16px] md:text-[18px] lg:text-[20px] leading-[1.6] mb-8 ${textColor} opacity-95 text-center sm:text-left`}>
                            {description}
                        </p>

                        <div className="flex flex-col sm:flex-row gap-6 sm:gap-4 items-center sm:items-start">
                            {/* Primary Button */}
                            <Link
                                href={primaryButtonHref}
                                onClick={openPopup}
                                className="w-full sm:w-auto text-center inline-flex items-center justify-center h-12 px-6 rounded-lg bg-[#FFB703] hover:bg-[#FFB703] text-black font-medium text-sm tracking-wide transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F5C842] focus-visible:ring-offset-2"
                            >
                                {primaryButtonText}
                            </Link>

                            {secondaryButtonText ? <LazyMeetergoCTAButton /> : null}
                        </div>
                    </div>
                </div>
            </div>

            {showPopup && (
                <>
                    <div id="cr-modal" className="cr-modal" onClick={closePopup} aria-hidden />
                    <div id="popup" className="cr-popup cr-maxwidth cr-top-center cr-popup-show" role="dialog" aria-modal="true">
                        <form
                            method="post"
                            action="https://flow.cleverreach.com/fl/dc9cc0ca-817c-4e47-bad3-f00510d3efc3/confirm"
                            target="_blank"
                            className="cr-form"
                        >
                            <button type="button" className="cr-close" onClick={closePopup} aria-label="Schliessen">
                                ✕
                            </button>
                            <input
                                type="text"
                                tabIndex={-1}
                                autoComplete="off"
                                className="cr-nope"
                                name="email_confirm"
                                aria-hidden
                            />

                            <div className="cr-web-wrapper bgcolor-1">
                                <div className="cr-web-row bgcolor-2" style={{ padding: '10px 20px' }}>
                                    <div className="cr-text color-2">
                                        <div className="cr-web-form">
                                            <label>Vorname</label>
                                            <input type="text" name="global.vorname" className="cr-input" />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="cr-web-wrapper bgcolor-1">
                                <div className="cr-web-row bgcolor-2" style={{ padding: '10px 20px' }}>
                                    <div className="cr-text color-2">
                                        <div className="cr-web-form">
                                            <label>Nachname</label>
                                            <input type="text" name="global.nachname" className="cr-input" />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="cr-web-wrapper bgcolor-1">
                                <div className="cr-web-row bgcolor-2" style={{ padding: '10px 20px' }}>
                                    <div className="cr-text color-2">
                                        <div className="cr-web-form">
                                            <label>Firma</label>
                                            <input type="text" name="global.firma" className="cr-input" />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="cr-web-wrapper bgcolor-1">
                                <div className="cr-web-row bgcolor-2" style={{ padding: '10px 20px' }}>
                                    <div className="cr-text color-2">
                                        <div className="cr-web-form">
                                            <label className="required">E-Mail</label>
                                            <input type="email" name="email" required className="cr-input" />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="cr-web-wrapper bgcolor-1">
                                <div className="cr-web-row bgcolor-2" style={{ padding: '10px 20px' }}>
                                    <div className="cr-text color-2">
                                        <div className="cr-web-form">
                                            <div>
                                                <div className="cr-consent-wrapper">
                                                    <input type="checkbox" name="tags[]" value="accept" required />
                                                    <label className="cr-consent-required">
                                                        Unser kostenloser Newsletter informiert Sie regelmaessig per E-Mail ueber Produktneuheiten und Sonderaktionen.
                                                        Ihre hier eingegebenen Daten werden lediglich zur Personalisierung des Newsletters verwendet und nicht an Dritte
                                                        weitergegeben. Durch Absenden der von Ihnen eingegebenen Daten willigen Sie in die Datenverarbeitung ein und
                                                        bestaetigen unsere Datenschutzerklaerung.
                                                    </label>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="cr-web-wrapper bgcolor-1">
                                <div className="cr-web-row bgcolor-2" style={{ padding: '10px 20px' }}>
                                    <div className="cr-web-form">
                                        <button type="submit" className="cr-submit aux-color-1 aux-bgcolor-1 cr-text">
                                            Anmelden
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </>
            )}

            <style jsx global>{`
                .bgcolor-1 { background-color: #F1F5F7; }
                .bgcolor-1-outlook { background-color: #F1F5F7; }
                .color-1 { color: #082137; }
                .bgcolor-2 { background-color: #FFF; }
                .bgcolor-2-outlook { background-color: #FFF; }
                .color-2 { color: #082137; }
                .aux-color-1 { color: #00282E; }
                .aux-bgcolor-1 { background-color: #00282E; }
                .aux-color-2 { color: #15C; }
                .aux-bgcolor-2 { background-color: #15C; }
                .cr-web-row { width: 100%; max-width: 600px; box-sizing: border-box; }
                .cr-maxwidth { max-width: 600px; }
                .cr-text { font-family: Helvetica, Arial, sans-serif; font-size: 14px; }
                .cr-nope { display: none !important; }
                .cr-web-wrapper { display: flex; justify-content: center; }
                .cr-web-row ul, .cr-web-row li { gap: 4px; flex-direction: row; }
                .cr-web-row ul { padding: 0 8px; margin: 0; list-style-type: none; flex-direction: column; }
                .cr-web-row option { min-height: 2em; white-space: normal; }
                .cr-web-form { display: flex; flex-direction: column; }
                .cr-web-form input, .cr-web-form select, .cr-web-form button { padding: 8px 12px; border-radius: 4px; border-style: solid; border-width: 1px; }
                .cr-web-form label, .cr-web-label { font-weight: 500; padding: 8px 0; font-style: normal; line-height: normal; }
                .cr-web-form button { font-size: 1em; font-weight: 700; color: #fff; font-style: normal; border-style: solid; border-color: #fff0; border-radius: 4px; cursor: pointer; }
                .cr-web-form label.required:after { content: ' *'; width: 10px; height: 100%; font-size: 1.1em; line-height: inherit; }
                .cr-web-label.required:after { content: ' *'; }
                .cr-popup { position: fixed; display: none; min-width: 200px; padding: 25px; width: 100%; }
                .cr-popup-show { display: block !important; z-index: 20000; }
                .cr-modal { position: fixed; top: 0; left: 0; height: 100%; width: 100%; background-color: #000; opacity: 0.4; z-index: 10000; animation: cr-fade-in 0.25s; }
                .cr-top-center { top: 0%; left: 50%; transform: translate(-50%, 0%); }
                .cr-popup form { box-shadow: 0 25px 70px rgba(0, 0, 0, 0.25); background: #fff; position: relative; border-radius: 18px; border: 1px solid rgba(0,0,0,0.05); overflow: hidden; }
                .cr-close { position: absolute; display: inline-flex; align-items: center; justify-content: center; width: 36px; height: 36px; z-index: 100; background: #fff; border-radius: 9999px; text-align: center; text-decoration: none; font-weight: 700; color: #0f172a; right: 16px; top: 16px; border: 1px solid rgba(0,0,0,0.1); box-shadow: 0 6px 18px rgba(0,0,0,0.08); transition: transform 120ms ease, box-shadow 120ms ease; }
                .cr-close:hover { transform: translateY(-1px); box-shadow: 0 10px 24px rgba(0,0,0,0.12); }
                .cr-consent-required { display: block; margin-left: 24px; padding: 0 !important; }
                .cr-consent-required:after { content: ' *'; }
                .cr-consent-wrapper { display: flex; align-items: start; gap: 10px; }
                .cr-consent-wrapper input { display: block; width: auto; margin-top: 6px; accent-color: #ffb703; }
                .cr-input { border: 1px solid #e2e8f0; border-radius: 12px; background: #fff; transition: border-color 120ms ease, box-shadow 120ms ease; }
                .cr-input:focus { outline: none; border-color: #ffb703; box-shadow: 0 0 0 3px rgba(255, 183, 3, 0.25); }
                .cr-web-form { gap: 6px; }
                .cr-web-form label { color: #0f172a; font-weight: 600; }
                .cr-submit { background: #ffb703; color: #0f172a; border: none; border-radius: 12px; box-shadow: 0 12px 30px rgba(255, 183, 3, 0.35); transition: transform 120ms ease, box-shadow 120ms ease, background 120ms ease; }
                .cr-submit:hover { background: #e6a600; transform: translateY(-1px); box-shadow: 0 16px 40px rgba(255, 183, 3, 0.45); }
                .cr-submit:active { transform: translateY(0); box-shadow: 0 10px 26px rgba(255, 183, 3, 0.35); }
                @keyframes cr-fade-in { 0% { opacity: 0; } }
                @media only screen and (max-width: 768px) { .cr-web-row { width: 90vw; } }
            `}</style>
        </section>
    );
}

function LazyMeetergoCTAButton() {
    const SRC = 'https://liv-showcase.s3.eu-central-1.amazonaws.com/browser-v3.js';
    const [loaded, setLoaded] = React.useState(false);
    const btnRef = React.useRef<HTMLButtonElement>(null);

    const ensureScript = React.useCallback(() => {
        return new Promise<void>((resolve, reject) => {
            if (loaded || document.querySelector(`script[src="${SRC}"]`)) {
                setLoaded(true);
                resolve();
                return;
            }
            const s = document.createElement('script');
            s.src = SRC;
            s.async = true;
            s.onload = () => { setLoaded(true); resolve(); };
            s.onerror = (e) => reject(e);
            document.body.appendChild(s);
        });
    }, [loaded]);

    const onClick = React.useCallback(async (e: React.MouseEvent<HTMLButtonElement>) => {
        if (!loaded) {
            e.preventDefault();
            e.stopPropagation();
            try {
                await ensureScript();
                setTimeout(() => {
                    btnRef.current?.dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true }));
                }, 0);
            } catch (err) {
                console.error('Failed to load Meetergo script (CTA)', err);
            }
        }
    }, [ensureScript, loaded]);

    return (
        <button
            ref={btnRef}
            onClick={onClick}
            type="button"
            className="meetergo-modal-button w-full sm:w-auto text-center inline-flex items-center justify-center h-12 px-6 rounded-lg bg-[#FFB703] hover:bg-[#FFB703] text-black font-medium text-sm tracking-wide transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F5C842] focus-visible:ring-offset-2 mt-3 sm:mt-0 sm:ml-4"
            {...({ link: 'https://cal.meetergo.com/infomardu/30-min-meeting-or-info' } as any)}
        >
            Demo Vereinbaren
        </button>
    );
}
