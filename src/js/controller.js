'use strict';

const { Pool } = require('./pool.js');


class Controller {
  #sql;
  constructor() {
    this.#sql = {
      createExpert: ( name, email, pass, job, uid) => {
        return `INSERT INTO surveydb.experts (id, username, email, password, job, users_id) VALUES (${null},\"${name}\", \"${email}\", \"${pass}\", \"${job}\", ${uid})`;
      },
      getExpert: ( id ) => `SELECT * FROM surveydb.experts WHERE id = ${id}`,
      getAllExperts: () => 'SELECT * from surveydb.experts',
      updateExpert: ( id, name, email, pass, job, uid ) => {
        return `UPDATE surveydb.experts SET username = \"${name}\", email = \"${email}\", password = \"${pass}\", job = \"${job}\",  users_id = \"${uid}\" WHERE id = ${id}`;
      },
      deleteExpert: ({ id }) => {
        return `DELETE FROM surveydb.experts WHERE id = ${id}`;
      },
      deleteAllExperts: () => `DELETE FROM surveydb.experts`,
    };
  }

  #sqlQuery (sql, res) {
    Pool.query(sql, (error, result) => {
      if (error) return res.status(500).json(error);
      result ? res.send(result) : res.sendStatus(404);
    });
  };

  getExpert (req, res)  {
    this.#sqlQuery(this.#sql.getExpert(req.params.id), res);
  };
  
  getAllExperts (req, res)  {    
    this.#sqlQuery(this.#sql.getAllExperts(), res);
  };
  
  createExpert   (req, res)   {
    if (!req.body) return res.sendStatus(400);      
    const uid = Math.floor(100 + Math.random() * 900);
    this.#sqlQuery(this.#sql.createExpert(req.body.username, req.body.email, req.body.password, req.body.job, uid), res);
    
  };
  
  deleteExpert    (req, res)   {
    this.#sqlQuery(this.#sql.deleteExpert(req.params), res);
  };
  
  updateExpert   (req, res)  {
    const uid = Math.floor(100 + Math.random() * 900);
    this.#sqlQuery(this.#sql.updateExpert(req.params.id, req.body.username, req.body.email, req.body.password, req.body.job, uid), res);
    
  };
  deleteAllExperts  (req, res)  {
    this.#sqlQuery(this.#sql.deleteAllExperts(), res);
  }
}

module.exports = {Controller};


