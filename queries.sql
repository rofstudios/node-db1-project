-- Database Queries

-- Find all customers with postal code 1010
SELECT * FROM Customers
WHERE PostalCode is 1010;

-- Find the phone number for the supplier with the id 11
SELECT Phone FROM Suppliers
WHERE SupplierID is 11;

-- List first 10 orders placed, sorted descending by the order date
SELECT * FROM Orders
ORDER BY OrderDate DESC LIMIT 10;

-- Find all customers that live in London, Madrid, or Brazil
SELECT * FROM [Customers]
WHERE (City is 'London' or City is 'Madrid') or (Country is 'Brazil');

-- Add a customer record for "The Shire", the contact name is "Bilbo Baggins" the address is -"1 Hobbit-Hole" in "Bag End", postal code "111" and the country is "Middle Earth"
INSERT INTO Customers
('CustomerName', 'contactName', 'Address', 'City', 'PostalCode', 'Country')
VALUES
('The Shire', 'Bilbo Baggins', '1 Hobbit-Hole', 'Bag End', '111', 'Middle Earth')

-- Update Bilbo Baggins record so that the postal code changes to "11122"
UPDATE Customers
SET Country = 'Middle Earth', PostalCode = '1122'
WHERE CustomerName is 'The Shire' --can also use 'like' instead of 'is' to ignore case sensitivity

-- (Stretch) Find a query to discover how many different cities are stored in the Customers table. Repeats should not be double counted
SELECT COUNT(DISTINCT City) --gives us a count of total cities
FROM Customers;

SELECT DISTINCT( City) --displays total unique cities(names)
FROM Customers;


-- (Stretch) Find all suppliers who have names longer than 20 characters. You can use `length(SupplierName)` to get the length of the name
SELECT * FROM [Suppliers]
WHERE LENGTH(SupplierName) > 20;