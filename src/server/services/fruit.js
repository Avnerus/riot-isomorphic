import NeDB from 'nedb'
import service from 'feathers-nedb'

export default service({
    Model:
         new NeDB({
            filaname: 'fruits.db',
            autoload: true

        })
    }
)
