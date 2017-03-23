module.exports = mongoose => {
    const SessionSchema = new mongoose.Schema({
        username:{type:'string'},
        password:{type:'string'}
    });
    return mongoose.model('Session',SessionSchema);
}