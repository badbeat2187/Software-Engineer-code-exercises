using System;
using System.Collections.Generic;
using System.Linq;
using TireChangeRefactor.Model;

namespace TireChangeRefactor
{
    /// <summary>
    /// Service responsible for determining the maintenance that is required
    /// for aircrafts
    /// </summary>
    public class MaintenanceService
    {
        /// <summary>
        /// Gets all the aircraft that are due for a tire change.
        /// </summary>
        /// <returns>An array of aircraft that require tire changes according to mfg specifications</returns>
        public AircraftModel[] GetAllAircraftDueForTireChange()
        {
            // There are 3 aircraft manufactures, each with different requirements 
            //  for when the tires need to be changed
            //      FooPlane: 120 landings
            //      BarPlane: 75 landings
            //      BazPlane: 200 landings

            var repo = new DAL.AircraftRepository();
            var allAircraft = repo.GetAll().ToArray();
            var requiresTireChange = new List<AircraftModel>();
            for (var i = 0; i < allAircraft.Count(); i++)
            {
                listOfAircrafts(allAircraft, requiresTireChange, i);
            }
            return requiresTireChange.ToArray();
        }

        private static void listOfAircrafts(AircraftModel[] allAircraft, List<AircraftModel> requiresTireChange, int i)
        {
            const string FooPlane = "FooPlane";
            const string BarPlane = "BarPlane";
            const string BazPlane = "BazPlane";
            var landings = new List<DateTime>();
            var Aircraft = allAircraft[i];
            for (var j = 0; j < Aircraft.Landings.Count(); j++)
            {
                if (Aircraft.Landings[j] >= Aircraft.LastTireChange)
                    landings.Add(Aircraft.Landings[j]);
            }
            Console.Write(landings.Count);
            switch (Aircraft.Manufacturer.ToString())
            {
                case FooPlane:
                    if (landings.Count >= 120)
                        requiresTireChange.Add(Aircraft);
                    break;
                case BarPlane:
                    if (landings.Count >= 75)
                        requiresTireChange.Add(Aircraft);
                    break;
                case BazPlane:
                    if (landings.Count >= 200)
                        requiresTireChange.Add(Aircraft);
                    break;
                default:
                    break;
            }
        }
    }
}
