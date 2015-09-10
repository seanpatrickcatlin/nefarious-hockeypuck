export default {
    get: function(itemKey) {
        try {
            return JSON.parse(localStorage.getItem(itemKey));
        }
        catch(e) {
            return null;
        }
    },
    set: function(itemKey, itemValue) {
        localStorage.setItem(itemKey, JSON.stringify(itemValue));
    }
};
