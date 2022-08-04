import { viteMockServe } from 'vite-plugin-mock';

export function configMockPlugin(env: Record<string, string>) {
  return viteMockServe({
    mockPath: 'mock',
    ignore: /^\_/,
    watchFiles: true,
    localEnabled: true,
    prodEnabled: env.VITE_PROD_BUILD === 'true'
  });
}
