import config from '@/payload.config';
import { importMap } from '@/app/(payload)/admin/importMap';
import { ProgressBar, RootProvider } from '@payloadcms/ui';
import { getClientConfig } from '@payloadcms/ui/utilities/getClientConfig';
import { handleServerFunctions } from '@payloadcms/next/layouts';
import { createLocalReq, getPayload, type ServerFunctionClient } from 'payload';
import '@payloadcms/next/css';

export const dynamic = 'force-dynamic';

const serverFunction: ServerFunctionClient = async (args) => {
  'use server';

  return handleServerFunctions({
    ...args,
    config,
    importMap,
  });
};

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const payload = await getPayload({ config });
  const req = await createLocalReq(
    {
      fallbackLocale: false,
    },
    payload,
  );

  const clientConfig = getClientConfig({
    config: payload.config,
    i18n: req.i18n,
    importMap,
    user: req.user ?? true,
  });

  const languageOptions = Object.entries(payload.config.i18n.supportedLanguages || {}).map(
    ([value, languageConfig]) => ({
      label: languageConfig.translations.general.thisLanguage,
      value,
    }),
  );

  return (
    <>
      <RootProvider
        config={clientConfig}
        dateFNSKey={req.i18n.dateFNSKey}
        fallbackLang={payload.config.i18n.fallbackLanguage}
        isNavOpen
        languageCode={req.i18n.language}
        languageOptions={languageOptions as never}
        locale={req.locale ?? undefined}
        permissions={null as never}
        serverFunction={serverFunction}
        theme="light"
        translations={req.i18n.translations}
        user={req.user}
      >
        <ProgressBar />
        {children}
      </RootProvider>
      <div id="portal" />
    </>
  );
}
