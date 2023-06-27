import app from './app'
import { register as registerRouter } from './router'
import { register as registerStore } from './store'
import { register as registerVendorComponents } from './components'

registerRouter(app)
registerStore(app)
registerVendorComponents(app)

export default app
