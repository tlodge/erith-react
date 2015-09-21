var Promise = require("bluebird");
var fs = require("fs");
var file = "erith.db";
var exists = fs.existsSync(file);
var sqlite3 = require("sqlite3").verbose();
var db = new sqlite3.Database(file);
var moment = require('moment');

Promise.promisifyAll(db);

module.exports = {

	execute: function(sql, params){
	 	return db.serializeAsync().then(function(){
	 		if (!params){
        		return db.allAsync(sql);
        	}else{
        		return db.allAsync(sql,params);
        	}
      	});
    },

    fetch_user_with_name: function(username){
    	var sql = "SELECT * FROM user WHERE username = ?";
    	return this.execute(sql,username).then(function(results){
    		return results.reduce(function(acc, obj){
    			return obj;
    		},null);
    	});
    },

    fetch_user_details: function(username){
    	var sql = "SELECT username FROM user WHERE username = ?";
    	return this.execute(sql,username).then(function(results){
    		return results.reduce(function(acc, obj){
    			return obj;
    		},null);
    	});
    },

    fetch_tags: function(){
		var sql = "SELECT * FROM tags WHERE active = 1";
    	return this.execute(sql).then(function(results){
    		return results.map(function(tag){
    			return tag.tag;
    		});
    	});
    },

    delete_tag: function(tag){
    	var sql = "UPDATE tags SET active = 0 WHERE tag = ?";
    	return this.execute(sql, tag);
    },

    add_tag: function(tag){
    	var sql = "INSERT INTO tags VALUES (?,?)";
    	return this.execute(sql, [tag,1]);
    },

    fetch_latest_message: function(){
    	var sql = "SELECT * FROM messages ORDER BY ts DESC LIMIT 1";
    	return this.execute(sql).then(function(results){
    		return results.reduce(function(acc, obj){
    			if (obj.ts){
    				obj.ts = moment(obj.ts).format('MMM Do YY, h:mm');
    			}
    			return obj;
    		},{message:"", ts:-1});
    	});
    },

    fetch_image_list: function(){
    	var sql = "SELECT image, tags, ts FROM images WHERE active = 1 ORDER BY ts DESC LIMIT 6";
    	return this.execute(sql).then(function(results){
    		return results.map(function(row){
    		
    			return{
    				image: row.image,
    				tags: row.tags.split(","),
    				ts: moment(row.ts).format('MMM Do YY, h:mm'),
    			};
    		});
    	});
    },

	add_message: function(message,ts){
    	var sql = "INSERT INTO messages VALUES (?,?)";
    	return this.execute(sql, [message, ts]);
    },

    create_image: function(image, tags, ts){
    	var sql = "INSERT INTO images (image,tags,ts,active) VALUES (?,?,?,?)";
    	return this.execute(sql, [image,tags,ts,1]);
    },

	delete_image: function(image, tags, ts){
    	var sql = "UPDATE images SET active = 0 WHERE image = ?";
    	return this.execute(sql, [image]);
    },

    create_user: function(username, password){
		var sql = "INSERT INTO user (username, password) VALUES (?,?)";
    	return this.execute(sql, [username, password]);
    },

    create_tables: function(){
    	var tags 	 = "CREATE TABLE IF NOT EXISTS tags(tag CHAR(128), active INTEGER, UNIQUE(tag) ON CONFLICT REPLACE);";
    	var messages = "CREATE TABLE IF NOT EXISTS messages(message CHAR(512), ts INTEGER);";
    	var images   = "CREATE TABLE IF NOT EXISTS images (image CHAR(128), tags CHAR(512), ts INTEGER, active INTEGER, UNIQUE(image) ON CONFLICT REPLACE);";
    	var user   	 = "CREATE TABLE IF NOT EXISTS user (username CHAR(128), password CHAR(128), UNIQUE(username) ON CONFLICT IGNORE);";
    	return Promise.all(
    		[this.execute(tags), this.execute(messages), this.execute(images), this.execute(user)]
    	).then(function(){
    		return true;
    	});
    },


};
