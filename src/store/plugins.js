import authPlugins from '@/domains/Auth/store/plugins'

import gratitudeDiariesPlugins from '@/domains/GratitudeDiaries/store/plugins'

export default [...authPlugins, ...gratitudeDiariesPlugins]
