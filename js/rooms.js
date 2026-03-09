async function bookRoom(roomId, roomData) {
    const guest = prompt("Guest Name / Email?");
    if (!guest) return;

    const payment = prompt("Payment Method? (cash / transfer)").toLowerCase();
    if (payment !== "cash" && payment !== "transfer") {
        alert("Invalid payment method. Use 'cash' or 'transfer'");
        return;
    }

    try {
        // Add billing
        await addDoc(collection(db, "billing"), {
            itemId: roomId,
            itemType: "room",
            name: `Room ${roomData.number}`,
            price: roomData.price,
            guest: guest,
            status: "Paid", // automatically paid since payment chosen
            paymentMethod: payment
        });

        // Update room status to Booked
        const roomRef = doc(db, "rooms", roomId);
        await updateDoc(roomRef, { status: "Booked" });

        alert("Room booked and paid! Billing added.");
        loadRooms(); // refresh cards
    } catch (err) {
        console.log(err);
        alert("Booking failed");
    }
}
