package com.higradius;

import java.io.IOException;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;


import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;



@WebServlet("/deleteinvoice")
public class DeleteInvoiceServlet extends HttpServlet{
	
	//credentials 
	static final String JDBC_DRIVER = "com.mysql.jdbc.Driver";
	static final String DB_URL = "jdbc:mysql://localhost:3306/h2h_internship";
    static final String USER = "root";
    static final String PASS = "Rising@tiger123";
    Connection connection = null;

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	public DeleteInvoiceServlet() {
		super();
	}
	
	@Override
	protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
		// TODO Auto-generated method stub
		
		
		try {
			
		        Class.forName("com.mysql.cj.jdbc.Driver");
			    connection = DriverManager.getConnection(DB_URL,USER,PASS);
			    
			    //getting the invoice id for which the invoice has to be deleted
			    long id = Integer.parseInt(req.getParameter("invoice_id"));
			    
			    //sql query to be executed
		        String sql;
		        sql = "DELETE FROM invoice_details where invoice_id = ?";
		        PreparedStatement statement = connection.prepareStatement(sql);
		        statement.setLong(1, id);
		        statement.executeUpdate();
		        resp.setStatus(200);
	 
		}
		catch (Exception e) {
			e.printStackTrace();
		}
		
	}

	@Override
	protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
		// TODO Auto-generated method stub
		doGet(req, resp);
	}



}
