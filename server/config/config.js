//These const are globals calling to process.env.NAMEVARIABLE

//Set up port
//READ DOCS looking for procces.env.PORT
//This sets up the port. Automatly can be 3000 or the url prnpm i mongoose
process.env.PORT = process.env.PORT || 3000


//THE KEY TO UNLOCK THE TOKEN
process.env.SEED = process.env.SEED || 'SEED-DEV'

//Token life
process.env.LIMIT_TOKEN_TIME = '30d'
