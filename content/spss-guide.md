# Mastering SPSS: The Ultimate Data Cleaning Guide for MUHAS Students

**Author:** Sadick A. Tunda  
**Category:** Data Analysis  
**Read Time:** 5 Minutes

---

Research is 20% data collection and 80% data cleaning. Many students rush to run "Regression Analysis" or "Chi-Square tests" immediately after entering data into SPSS. This is a fatal mistake. If your data is "dirty" (contains errors, missing values, or outliers), your p-values will be wrong, and your results will be rejected.

Here is the standard **Tafiti99 Protocol** for cleaning data before analysis.

## 1. Variable View Setup ( The Foundation)
Before entering a single number, you must set up your **Variable View** correctly.
* **Name:** Keep it short, no spaces (e.g., `Mat_Age` instead of `Maternal Age`).
* **Label:** Write the full question here (e.g., "What is the age of the mother in years?"). This is what appears on your charts.
* **Values:** This is crucial for categorical data.
    * *Example:* 1 = Male, 2 = Female.
    * *Tip:* Always have a code for "Don't Know" (e.g., 99).
* **Measure:** Ensure SPSS knows if the data is `Scale` (Age, Weight), `Nominal` (Gender, District), or `Ordinal` (Likert scales: Agree/Disagree).

## 2. Check for "Wild" Codes (Frequency Check)
A common error is typing "3" when the options are only "1 = Yes" and "2 = No". To find these errors:
1.  Go to **Analyze** > **Descriptive Statistics** > **Frequencies**.
2.  Select all your categorical variables (Gender, Education, etc.).
3.  Click **OK**.
4.  **Scan the Output:** Look for any values that shouldn't be there. If you see a "3" in a Yes/No question, find that ID in Data View and fix it.

## 3. Handling Missing Values
Missing data can ruin your study. You need to know *why* it is missing.
* **System Missing (Dots):** The respondent skipped it.
* **User Missing:** You coded it as "Not Applicable".

**The Fix:**
If a variable has more than 5% missing data, do not just ignore it. You may need to run a "Missing Value Analysis" or decide if that variable should be excluded from the regression model.

## 4. Continuous Data: Checking for Outliers
An outlier is a value that doesn't make sense (e.g., `Age = 200` or `Hb = 45 g/dL`).
1.  Go to **Analyze** > **Descriptive Statistics** > **Explore**.
2.  Put continuous variables (Age, BMI, Hemoglobin) in the **Dependent List**.
3.  Click **Plots** and check **Boxplots**.
4.  **Read the Boxplot:** Any circle or star appearing far outside the "whiskers" of the box is an outlier. Check the Case Number next to the star and verify the file.

## 5. Recoding Variables (The "Transform" Tool)
Often, you collect specific data (e.g., Age: 24, 25, 30) but you need to analyze categories (e.g., Youth vs. Adults).
* **DO NOT** type a new column manually.
* **DO THIS:** Go to **Transform** > **Recode into Different Variables**.
* Name the new variable (e.g., `Age_Group`).
* Set the ranges (e.g., 18-24 = 1, 25+ = 2).

> **Pro Tip:** Never use "Recode into Same Variables." If you make a mistake, you lose your original data forever. Always create a *new* variable.

---

### Summary Checklist
- [ ] Are all variables labelled clearly?
- [ ] Have you checked frequencies for typing errors?
- [ ] Are missing values coded correctly (e.g., 99)?
- [ ] Have you removed impossible outliers?

**Stuck with a messy dataset?** Don't risk your GPA. Tafiti99 offers professional data cleaning services starting from TZS 50,000.  
[**Chat with us on WhatsApp**](https://wa.me/255684606325)