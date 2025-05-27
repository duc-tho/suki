import baseConfig from '@adonisjs/prettier-config'

const config = {
   ...baseConfig,
   plugins: [...baseConfig.plugins, 'prettier-plugin-tailwindcss'],
}

export default config
