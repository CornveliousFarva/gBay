function bidItem (){
    console.log("Make a bid\n")
    connection.query("How much would you like to bid?\n"), function(err, res){
        if (err) throw err;
        console.log("bid has been placed!\n")
    }

    console.log(query.sql);
}