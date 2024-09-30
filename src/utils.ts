export function getCookie(key: string) {
    const b = document.cookie.match("(^|;)\\s*" + key + "\\s*=\\s*([^;]+)");
    return b ? b.pop() : "";
}

export function validateInput(json: {
    name?: string;
    price?: number;
    quantity?: number;
    description?: string;
    index?: number;
}) {
    if (json.name == null || json.name == "") {
        alert("Item name cannot be empty");
        return false;
    }
    if (json.price == null || json.price == 0 || isNaN(json.price)) {
        alert("Price must be a positive decimal number");
        return false;
    }
    if (json.quantity == null || json.quantity == 0 || isNaN(json.quantity)) {
        alert("Quantity must be a positive number");
        return false;
    }

    return true;
}
