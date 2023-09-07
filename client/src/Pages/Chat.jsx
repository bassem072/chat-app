import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown, faRotate } from "@fortawesome/free-solid-svg-icons";
import style from "./style.module.css";
import magnifyingGlass from "../assets/icons/MagnifyingGlass.png";
import user1 from "../assets/images/users/user_1.png";
import user2 from "../assets/images/users/user_2.png";
import user3 from "../assets/images/users/user_3.png";
import user4 from "../assets/images/users/user_4.png";
import user5 from "../assets/images/users/user_5.png";

export default function Chat() {
  return (
    <div className="w-full h-screen flex gap-3">
      <div className="w-1/4 h-screen max-h-screen">
        <div className="w-4/5 h-screen flex flex-col justify-center gap-5 pt-5 pl-5">
          <div className="h-12 flex items-center gap-4 px-4 py-3 bg-active rounded-lg text-paragraph">
            <img
              src={magnifyingGlass}
              alt="Magnifying Glass"
              className="w-6 h-6 invert-[50] opacity-50"
            />
            <input
              type="text"
              name="search"
              placeholder="Search"
              className="bg-active outline-none"
            />
          </div>
          <div className="h-20 py-2 flex gap-3">
            <div className="w-1/5 aspect-square p-1 border-2 border-message rounded-full overflow-hidden">
              <div className="bg-paragraph rounded-full overflow-hidden">
                <img src={user1} alt="user1" />
              </div>
            </div>
            <div className="w-1/5 aspect-square p-1 border-2 border-message rounded-full overflow-hidden">
              <div className="bg-paragraph rounded-full overflow-hidden">
                <img src={user2} alt="user2" />
              </div>
            </div>
            <div className="w-1/5 aspect-square p-1 border-2 border-message rounded-full overflow-hidden">
              <div className="bg-paragraph rounded-full overflow-hidden">
                <img src={user3} alt="user3" />
              </div>
            </div>
            <div className="w-1/5 aspect-square p-1 border-2 border-message rounded-full overflow-hidden">
              <div className="bg-paragraph rounded-full overflow-hidden">
                <img src={user4} alt="user4" />
              </div>
            </div>
            <div className="w-1/5 aspect-square p-1 border-2 border-message rounded-full overflow-hidden">
              <div className="bg-paragraph rounded-full overflow-hidden">
                <img src={user5} alt="user5" />
              </div>
            </div>
          </div>
          <div className="h-[100%-168px] flex flex-col gap-3 overflow-hidden">
            <div className="flex justify-between items-center">
              <div className="relative flex items-center gap-2 opacity-50 pb-2">
                <p className="pl-1">Messages</p>
                <FontAwesomeIcon icon={faAngleDown} />
                <div className="absolute top-full left-0 w-0 text-left rounded-md overflow-hidden">
                  <div className="h-10 flex items-center bg-active pl-2 border-b-[1px] hover:bg-message">
                    Messages
                  </div>
                  <div className="h-10 flex items-center bg-active pl-2 border-b-[1px] hover:bg-message">
                    Groups
                  </div>
                  <div className="h-10 flex items-center bg-active pl-2 border-b-[1px] hover:bg-message">
                    People
                  </div>
                </div>
              </div>
              <div className="opacity-50">
                <FontAwesomeIcon icon={faRotate} />
              </div>
            </div>
            <div
              className={`h-full whitespace-nowrap overflow-auto ${style.scrollbar}`}
            >
              <div className="h-[12.5%] flex justify-between items-center py-2">
                <div className="flex items-center gap-4">
                  <div className="relative">
                    <div className="w-16 h-16 bg-paragraph rounded-full overflow-hidden">
                      <img src={user2} alt="user2" />
                    </div>
                    <div className="absolute w-4 h-4 rounded-full bg-green-600 bottom-0 right-1 border-primary border-2"></div>
                  </div>
                  <div className="flex flex-col gap-2 justify-between text-sm text-start">
                    <div>Bassem Elsayed</div>
                    <div className="text-message">
                      This my mistake and i can fix it
                    </div>
                  </div>
                </div>
                <div className="flex flex-col gap-2 justify-between text-sm items-end">
                  <div>10:42</div>
                  <div className="w-5 h-5 bg-message rounded-full flex justify-center items-center text-sm">
                    2
                  </div>
                </div>
              </div>
              <div className="h-[12.5%] flex justify-between items-center py-2">
                <div className="flex items-center gap-4">
                  <div className="relative">
                    <div className="w-16 h-16 bg-paragraph rounded-full overflow-hidden">
                      <img src={user2} alt="user2" />
                    </div>
                    <div className="absolute w-4 h-4 rounded-full bg-green-600 bottom-0 right-1 border-primary border-2"></div>
                  </div>
                  <div className="flex flex-col gap-2 justify-between text-sm text-start">
                    <div>Bassem Elsayed</div>
                    <div className="text-message">
                      This my mistake and i can fix it
                    </div>
                  </div>
                </div>
                <div className="flex flex-col gap-2 justify-between text-sm items-end">
                  <div>10:42</div>
                  <div className="w-5 h-5 bg-message rounded-full flex justify-center items-center text-sm">
                    2
                  </div>
                </div>
              </div>
              <div className="h-[12.5%] flex justify-between items-center py-2">
                <div className="flex items-center gap-4">
                  <div className="relative">
                    <div className="w-16 h-16 bg-paragraph rounded-full overflow-hidden">
                      <img src={user2} alt="user2" />
                    </div>
                    <div className="absolute w-4 h-4 rounded-full bg-green-600 bottom-0 right-1 border-primary border-2"></div>
                  </div>
                  <div className="flex flex-col gap-2 justify-between text-sm text-start">
                    <div>Bassem Elsayed</div>
                    <div className="text-message">
                      This my mistake and i can fix it
                    </div>
                  </div>
                </div>
                <div className="flex flex-col gap-2 justify-between text-sm items-end">
                  <div>10:42</div>
                  <div className="w-5 h-5 bg-message rounded-full flex justify-center items-center text-sm">
                    2
                  </div>
                </div>
              </div>
              <div className="h-[12.5%] flex justify-between items-center py-2">
                <div className="flex items-center gap-4">
                  <div className="relative">
                    <div className="w-16 h-16 bg-paragraph rounded-full overflow-hidden">
                      <img src={user2} alt="user2" />
                    </div>
                    <div className="absolute w-4 h-4 rounded-full bg-green-600 bottom-0 right-1 border-primary border-2"></div>
                  </div>
                  <div className="flex flex-col gap-2 justify-between text-sm text-start">
                    <div>Bassem Elsayed</div>
                    <div className="text-message">
                      This my mistake and i can fix it
                    </div>
                  </div>
                </div>
                <div className="flex flex-col gap-2 justify-between text-sm items-end">
                  <div>10:42</div>
                  <div className="w-5 h-5 bg-message rounded-full flex justify-center items-center text-sm">
                    2
                  </div>
                </div>
              </div>
              <div className="h-[12.5%] flex justify-between items-center py-2">
                <div className="flex items-center gap-4">
                  <div className="relative">
                    <div className="w-16 h-16 bg-paragraph rounded-full overflow-hidden">
                      <img src={user2} alt="user2" />
                    </div>
                    <div className="absolute w-4 h-4 rounded-full bg-green-600 bottom-0 right-1 border-primary border-2"></div>
                  </div>
                  <div className="flex flex-col gap-2 justify-between text-sm text-start">
                    <div>Bassem Elsayed</div>
                    <div className="text-message">
                      This my mistake and i can fix it
                    </div>
                  </div>
                </div>
                <div className="flex flex-col gap-2 justify-between text-sm items-end">
                  <div>10:42</div>
                  <div className="w-5 h-5 bg-message rounded-full flex justify-center items-center text-sm">
                    2
                  </div>
                </div>
              </div>
              <div className="h-[12.5%] flex justify-between items-center py-2">
                <div className="flex items-center gap-4">
                  <div className="relative">
                    <div className="w-16 h-16 bg-paragraph rounded-full overflow-hidden">
                      <img src={user2} alt="user2" />
                    </div>
                    <div className="absolute w-4 h-4 rounded-full bg-green-600 bottom-0 right-1 border-primary border-2"></div>
                  </div>
                  <div className="flex flex-col gap-2 justify-between text-sm text-start">
                    <div>Bassem Elsayed</div>
                    <div className="text-message">
                      This my mistake and i can fix it
                    </div>
                  </div>
                </div>
                <div className="flex flex-col gap-2 justify-between text-sm items-end">
                  <div>10:42</div>
                  <div className="w-5 h-5 bg-message rounded-full flex justify-center items-center text-sm">
                    2
                  </div>
                </div>
              </div>
              <div className="h-[12.5%] flex justify-between items-center py-2">
                <div className="flex items-center gap-4">
                  <div className="relative">
                    <div className="w-16 h-16 bg-paragraph rounded-full overflow-hidden">
                      <img src={user2} alt="user2" />
                    </div>
                    <div className="absolute w-4 h-4 rounded-full bg-green-600 bottom-0 right-1 border-primary border-2"></div>
                  </div>
                  <div className="flex flex-col gap-2 justify-between text-sm text-start">
                    <div>Bassem Elsayed</div>
                    <div className="text-message">
                      This my mistake and i can fix it
                    </div>
                  </div>
                </div>
                <div className="flex flex-col gap-2 justify-between text-sm items-end">
                  <div>10:42</div>
                  <div className="w-5 h-5 bg-message rounded-full flex justify-center items-center text-sm">
                    2
                  </div>
                </div>
              </div>
              <div className="h-[12.5%] flex justify-between items-center py-2">
                <div className="flex items-center gap-4">
                  <div className="relative">
                    <div className="w-16 h-16 bg-paragraph rounded-full overflow-hidden">
                      <img src={user2} alt="user2" />
                    </div>
                    <div className="absolute w-4 h-4 rounded-full bg-green-600 bottom-0 right-1 border-primary border-2"></div>
                  </div>
                  <div className="flex flex-col gap-2 justify-between text-sm text-start">
                    <div>Bassem Elsayed</div>
                    <div className="text-message">
                      This my mistake and i can fix it
                    </div>
                  </div>
                </div>
                <div className="flex flex-col gap-2 justify-between text-sm items-end">
                  <div>10:42</div>
                  <div className="w-5 h-5 bg-message rounded-full flex justify-center items-center text-sm">
                    2
                  </div>
                </div>
              </div>
              <div className="h-[12.5%] flex justify-between items-center py-2">
                <div className="flex items-center gap-4">
                  <div className="relative">
                    <div className="w-16 h-16 bg-paragraph rounded-full overflow-hidden">
                      <img src={user2} alt="user2" />
                    </div>
                    <div className="absolute w-4 h-4 rounded-full bg-green-600 bottom-0 right-1 border-primary border-2"></div>
                  </div>
                  <div className="flex flex-col gap-2 justify-between text-sm text-start">
                    <div>Bassem Elsayed</div>
                    <div className="text-message">
                      This my mistake and i can fix it
                    </div>
                  </div>
                </div>
                <div className="flex flex-col gap-2 justify-between text-sm items-end">
                  <div>10:42</div>
                  <div className="w-5 h-5 bg-message rounded-full flex justify-center items-center text-sm">
                    2
                  </div>
                </div>
              </div>
              <div className="h-[12.5%] flex justify-between items-center py-2">
                <div className="flex items-center gap-4">
                  <div className="relative">
                    <div className="w-16 h-16 bg-paragraph rounded-full overflow-hidden">
                      <img src={user2} alt="user2" />
                    </div>
                    <div className="absolute w-4 h-4 rounded-full bg-green-600 bottom-0 right-1 border-primary border-2"></div>
                  </div>
                  <div className="flex flex-col gap-2 justify-between text-sm text-start">
                    <div>Bassem Elsayed</div>
                    <div className="text-message">
                      This my mistake and i can fix it
                    </div>
                  </div>
                </div>
                <div className="flex flex-col gap-2 justify-between text-sm items-end">
                  <div>10:42</div>
                  <div className="w-5 h-5 bg-message rounded-full flex justify-center items-center text-sm">
                    2
                  </div>
                </div>
              </div>
              <div className="h-[12.5%] flex justify-between items-center py-2">
                <div className="flex items-center gap-4">
                  <div className="relative">
                    <div className="w-16 h-16 bg-paragraph rounded-full overflow-hidden">
                      <img src={user2} alt="user2" />
                    </div>
                    <div className="absolute w-4 h-4 rounded-full bg-green-600 bottom-0 right-1 border-primary border-2"></div>
                  </div>
                  <div className="flex flex-col gap-2 justify-between text-sm text-start">
                    <div>Bassem Elsayed</div>
                    <div className="text-message">
                      This my mistake and i can fix it
                    </div>
                  </div>
                </div>
                <div className="flex flex-col gap-2 justify-between text-sm items-end">
                  <div>10:42</div>
                  <div className="w-5 h-5 bg-message rounded-full flex justify-center items-center text-sm">
                    2
                  </div>
                </div>
              </div>
              <div className="h-[12.5%] flex justify-between items-center py-2">
                <div className="flex items-center gap-4">
                  <div className="relative">
                    <div className="w-16 h-16 bg-paragraph rounded-full overflow-hidden">
                      <img src={user2} alt="user2" />
                    </div>
                    <div className="absolute w-4 h-4 rounded-full bg-green-600 bottom-0 right-1 border-primary border-2"></div>
                  </div>
                  <div className="flex flex-col gap-2 justify-between text-sm text-start">
                    <div>Bassem Elsayed</div>
                    <div className="text-message">
                      This my mistake and i can fix it
                    </div>
                  </div>
                </div>
                <div className="flex flex-col gap-2 justify-between text-sm items-end">
                  <div>10:42</div>
                  <div className="w-5 h-5 bg-message rounded-full flex justify-center items-center text-sm">
                    2
                  </div>
                </div>
              </div>
              <div className="h-[12.5%] flex justify-between items-center py-2">
                <div className="flex items-center gap-4">
                  <div className="relative">
                    <div className="w-16 h-16 bg-paragraph rounded-full overflow-hidden">
                      <img src={user2} alt="user2" />
                    </div>
                    <div className="absolute w-4 h-4 rounded-full bg-green-600 bottom-0 right-1 border-primary border-2"></div>
                  </div>
                  <div className="flex flex-col gap-2 justify-between text-sm text-start">
                    <div>Bassem Elsayed</div>
                    <div className="text-message">
                      This my mistake and i can fix it
                    </div>
                  </div>
                </div>
                <div className="flex flex-col gap-2 justify-between text-sm items-end">
                  <div>10:42</div>
                  <div className="w-5 h-5 bg-message rounded-full flex justify-center items-center text-sm">
                    2
                  </div>
                </div>
              </div>
              <div className="h-[12.5%] flex justify-between items-center py-2">
                <div className="flex items-center gap-4">
                  <div className="relative">
                    <div className="w-16 h-16 bg-paragraph rounded-full overflow-hidden">
                      <img src={user2} alt="user2" />
                    </div>
                    <div className="absolute w-4 h-4 rounded-full bg-green-600 bottom-0 right-1 border-primary border-2"></div>
                  </div>
                  <div className="flex flex-col gap-2 justify-between text-sm text-start">
                    <div>Bassem Elsayed</div>
                    <div className="text-message">
                      This my mistake and i can fix it
                    </div>
                  </div>
                </div>
                <div className="flex flex-col gap-2 justify-between text-sm items-end">
                  <div>10:42</div>
                  <div className="w-5 h-5 bg-message rounded-full flex justify-center items-center text-sm">
                    2
                  </div>
                </div>
              </div>
              <div className="h-[12.5%] flex justify-between items-center py-2">
                <div className="flex items-center gap-4">
                  <div className="relative">
                    <div className="w-16 h-16 bg-paragraph rounded-full overflow-hidden">
                      <img src={user2} alt="user2" />
                    </div>
                    <div className="absolute w-4 h-4 rounded-full bg-green-600 bottom-0 right-1 border-primary border-2"></div>
                  </div>
                  <div className="flex flex-col gap-2 justify-between text-sm text-start">
                    <div>Bassem Elsayed</div>
                    <div className="text-message">
                      This my mistake and i can fix it
                    </div>
                  </div>
                </div>
                <div className="flex flex-col gap-2 justify-between text-sm items-end">
                  <div>10:42</div>
                  <div className="w-5 h-5 bg-message rounded-full flex justify-center items-center text-sm">
                    2
                  </div>
                </div>
              </div>
              <div className="h-[12.5%] flex justify-between items-center py-2">
                <div className="flex items-center gap-4">
                  <div className="relative">
                    <div className="w-16 h-16 bg-paragraph rounded-full overflow-hidden">
                      <img src={user2} alt="user2" />
                    </div>
                    <div className="absolute w-4 h-4 rounded-full bg-green-600 bottom-0 right-1 border-primary border-2"></div>
                  </div>
                  <div className="flex flex-col gap-2 justify-between text-sm text-start">
                    <div>Bassem Elsayed</div>
                    <div className="text-message">
                      This my mistake and i can fix it
                    </div>
                  </div>
                </div>
                <div className="flex flex-col gap-2 justify-between text-sm items-end">
                  <div>10:42</div>
                  <div className="w-5 h-5 bg-message rounded-full flex justify-center items-center text-sm">
                    2
                  </div>
                </div>
              </div>
              <div className="h-[12.5%] flex justify-between items-center py-2">
                <div className="flex items-center gap-4">
                  <div className="relative">
                    <div className="w-16 h-16 bg-paragraph rounded-full overflow-hidden">
                      <img src={user2} alt="user2" />
                    </div>
                    <div className="absolute w-4 h-4 rounded-full bg-green-600 bottom-0 right-1 border-primary border-2"></div>
                  </div>
                  <div className="flex flex-col gap-2 justify-between text-sm text-start">
                    <div>Bassem Elsayed</div>
                    <div className="text-message">
                      This my mistake and i can fix it
                    </div>
                  </div>
                </div>
                <div className="flex flex-col gap-2 justify-between text-sm items-end">
                  <div>10:42</div>
                  <div className="w-5 h-5 bg-message rounded-full flex justify-center items-center text-sm">
                    2
                  </div>
                </div>
              </div>
              <div className="h-[12.5%] flex justify-between items-center py-2">
                <div className="flex items-center gap-4">
                  <div className="relative">
                    <div className="w-16 h-16 bg-paragraph rounded-full overflow-hidden">
                      <img src={user2} alt="user2" />
                    </div>
                    <div className="absolute w-4 h-4 rounded-full bg-green-600 bottom-0 right-1 border-primary border-2"></div>
                  </div>
                  <div className="flex flex-col gap-2 justify-between text-sm text-start">
                    <div>Bassem Elsayed</div>
                    <div className="text-message">
                      This my mistake and i can fix it
                    </div>
                  </div>
                </div>
                <div className="flex flex-col gap-2 justify-between text-sm items-end">
                  <div>10:42</div>
                  <div className="w-5 h-5 bg-message rounded-full flex justify-center items-center text-sm">
                    2
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="w-3/4">2</div>
    </div>
  );
}
