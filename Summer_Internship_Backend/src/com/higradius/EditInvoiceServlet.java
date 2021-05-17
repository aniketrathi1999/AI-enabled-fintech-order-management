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



@WebServlet("/editinvoice")
public class EditInvoiceServlet extends HttpServlet{
	//credentials 
	static final String JDBC_DRIVER = "com.mysql.jdbc.Driver";
	static final String DB_URL = "jdbc:mysql://localhost:3306/h2h_internship";
    static final String USER = "root";
    static final String PASS = "Rising@tiger123";
    
    Connection connection = null;
    
    private static final long serialVersionUID = 1L;

	public EditInvoiceServlet() {
		super();
	}
	@Override
	protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException{

		
		resp.setContentType("application/json");
		resp.setCharacterEncoding("UTF-8");
		
		
	     try {
	    	 
	    	Class.forName("com.mysql.cj.jdbc.Driver");
		    connection = DriverManager.getConnection(DB_URL,USER,PASS);
		    
		    Double amount=Double.parseDouble(req.getParameter("amount"));
		    String notes=req.getParameter("notes");
		    int invoice_id=Integer.parseInt(req.getParameter("invoice_id"));
		    
		    // sql query to be executed
		    
	         String sqlQuery;
	         sqlQuery="UPDATE invoice_details"+ " SET total_open_amount= (?) , notes = (?) " + " WHERE invoice_id = (?) ";
	    	 PreparedStatement statement=connection.prepareStatement(sqlQuery);
	    	 statement.setDouble(1,amount);
	    	 statement.setString(2,notes);
	    	 statement.setInt(3,invoice_id);
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