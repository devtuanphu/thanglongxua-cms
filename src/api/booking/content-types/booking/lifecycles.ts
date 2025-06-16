// import nodemailer from "nodemailer";

// export default {
//   async afterCreate(event: { result: any; params: any }) {
//     const { result } = event;

//     const { name, email, note, numberPeople, dateStart, total } = result;

//     try {
//       const transporter = nodemailer.createTransport({
//         service: "gmail",
//         auth: {
//           user: process.env.EMAIL_USERNAME, // yourcompany@gmail.com
//           pass: process.env.EMAIL_PASSWORD, // Gmail App Password
//         },
//       });

//       const formattedDate = new Date(dateStart).toLocaleDateString();

//       const html = `
//         <div style="font-family: Arial, sans-serif; padding: 20px; border: 1px solid #eee;">
//           <h2 style="color: #2e86de;">✅ Tour Booking Confirmation</h2>
//           <p>Hello <strong>${name}</strong>,</p>

//           <p>We have received your tour booking. Here are the details:</p>

//           <table cellpadding="5" cellspacing="0" border="0">
//             <tr><td><strong>📆 Departure Date:</strong></td><td>${formattedDate}</td></tr>
//             <tr><td><strong>👥 Number of People:</strong></td><td>${numberPeople}</td></tr>
//             <tr><td><strong>🧾 Total Price:</strong></td><td>$${total}</td></tr>
//             ${
//               note
//                 ? `<tr><td><strong>📝 Notes:</strong></td><td>${note}</td></tr>`
//                 : ""
//             }
//           </table>

//           <p style="margin-top: 20px;">
//             We will contact you shortly for confirmation and further details.<br />
//             Thank you for choosing our service!
//           </p>

//           <hr />
//           <p style="font-size: 12px; color: #999;">If you have any questions, reply to this email.</p>
//         </div>
//       `;

//       await transporter.sendMail({
//         from: `"Your Company" <${process.env.EMAIL_USERNAME}>`,
//         to: email,
//         subject: "Your Tour Booking Confirmation",
//         html,
//       });

//       strapi.log.info(`✅ Booking confirmation email sent to ${email}`);
//     } catch (error) {
//       strapi.log.error("❌ Failed to send booking confirmation email", error);
//     }
//   },
// };

import nodemailer from "nodemailer";
import dayjs from "dayjs";

export default {
  async afterCreate(event: { result: any }) {
    const { result } = event;
    const bookingId = result.id;
    const fullBooking = await strapi.entityService.findOne(
      "api::booking.booking",
      bookingId,
      {
        populate: ["tour"],
      }
    );

    const { name, email, note, numberPeople, dateStart, total, tour } =
      fullBooking;

    try {
      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: process.env.EMAIL_USERNAME,
          pass: process.env.EMAIL_PASSWORD,
        },
      });

      const formattedDate = dayjs(dateStart).format("MMMM D, YYYY");

      const html = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 30px; border: 1px solid #eee;">
          <div style="text-align: right; font-size: 12px; color: #777;">
            <div><strong>Thang Long xua</strong></div>
            <div>sale@thanglongxua-tourism.com</div>
            <div>+84 (353) 280 445</div>
            <div>www.thanglongxua-tourism.com</div>
          </div>

          <div style="text-align: center; margin: 30px 0;">
            <h2 style="margin-top: 10px; color: #333;">Tour Booking Confirmation</h2>
          </div>

          <p>Dear <strong>${name}</strong>,</p>

          <p>
            We are pleased to confirm your reservation for the tour: 
            <strong>${tour?.title || "Your Selected Tour"}</strong>.
            We appreciate your trust in us and are excited to host your journey.
          </p>

          <h3 style="margin-top: 30px; border-bottom: 1px solid #ccc; padding-bottom: 5px;">Booking Details</h3>
          <table style="width: 100%; margin-top: 10px; font-size: 15px;">
            <tr>
              <td><strong>Departure Date:</strong></td>
              <td>${formattedDate}</td>
            </tr>
            <tr>
              <td><strong>Number of Guests:</strong></td>
              <td>${numberPeople}</td>
            </tr>
            <tr>
              <td><strong>Total Price:</strong></td>
              <td>$${total}</td>
            </tr>
            ${
              note
                ? `<tr><td><strong>Additional Notes:</strong></td><td>${note}</td></tr>`
                : ""
            }
          </table>

          <p style="margin-top: 30px;">
            If you have any questions or need to make changes to your booking,
            please reply to this email or contact our support team.
          </p>

          <p>Thank you again for choosing us.</p>

          <p style="margin-top: 40px;">Best regards,<br /><strong>Thang Long Xua</strong></p>

          <hr style="margin-top: 40px;" />
          <p style="font-size: 12px; color: #888;">
            This is an automated email. If you received this by mistake, please ignore it.
          </p>
        </div>
      `;

      await transporter.sendMail({
        from: `Thang Long Xua`,
        to: email,
        subject: "Your Tour Booking Confirmation",
        html,
      });

      strapi.log.info(`✅ Booking confirmation email sent to ${email}`);
    } catch (error) {
      strapi.log.error("❌ Failed to send booking confirmation email", error);
    }
  },
};
